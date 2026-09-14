// Persistent & In-Memory Store for Custom Infographics and Assets
// Uses IndexedDB for multi-megabyte image storage without quota limits,
// plus an instant in-memory cache for synchronous render loops.

const DB_NAME = 'DiSanHCM_AssetDB';
const DB_VERSION = 1;
const STORE_NAME = 'custom_assets';

// In-memory cache for fast synchronous lookup
const inMemoryCache = new Map<string, string>();
const listeners = new Set<() => void>();

function normalizeKey(key: string): string {
  if (!key) return '';
  const fileName = key.split('/').pop() || key;
  // Lowercase, remove spaces, underscores, dashes, extensions
  return fileName
    .toLowerCase()
    .trim()
    .replace(/[\s\-_]/g, '');
}

// Open or create IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Initialize on app load: restore all saved assets from IndexedDB into memory
export async function initCustomAssetStore(): Promise<void> {
  if (typeof window === 'undefined' || !window.indexedDB) return;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    return new Promise((resolve) => {
      request.onsuccess = () => {
        const items = request.result as { key: string; dataUrl: string }[];
        if (items && Array.isArray(items)) {
          items.forEach((item) => {
            if (item && item.key && item.dataUrl) {
              inMemoryCache.set(item.key, item.dataUrl);
              inMemoryCache.set(normalizeKey(item.key), item.dataUrl);
            }
          });
        }
        notifyListeners();
        resolve();
      };
      request.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Could not initialize IndexedDB asset store:', err);
  }
}

// Subscribe to store updates
export function subscribeToAssetStore(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // ignore
    }
  });
}

// Save an asset: synchronous to in-memory, async to IndexedDB & localStorage
export async function saveCustomAsset(rawKey: string, dataUrl: string): Promise<boolean> {
  if (!rawKey || !dataUrl) return false;
  const fileName = rawKey.split('/').pop() || rawKey;
  const normalized = normalizeKey(fileName);

  // 1. Immediately store in memory cache
  inMemoryCache.set(rawKey, dataUrl);
  inMemoryCache.set(fileName, dataUrl);
  inMemoryCache.set(normalized, dataUrl);

  // Also map numbers like "image4" -> "image4.png"
  const matchNum = normalized.match(/image(\d+)/i);
  if (matchNum) {
    const num = matchNum[1];
    inMemoryCache.set(`image${num}.png`, dataUrl);
    inMemoryCache.set(`image${num}.jpg`, dataUrl);
    inMemoryCache.set(`image${num}`, dataUrl);
  }

  // 2. Try saving to IndexedDB for persistent large file storage
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ key: fileName, dataUrl });
    store.put({ key: normalized, dataUrl });
    if (matchNum) {
      store.put({ key: `image${matchNum[1]}.png`, dataUrl });
    }
  } catch (err) {
    console.warn('IndexedDB write failed, falling back to memory only:', err);
  }

  // 3. Notify React components to re-render
  notifyListeners();
  return true;
}

// Synchronously get custom asset
export function getCustomAsset(assetPath: string): string | null {
  if (!assetPath) return null;
  const fileName = assetPath.split('/').pop() || assetPath;
  const normalized = normalizeKey(fileName);

  // 1. Check in-memory cache directly
  if (inMemoryCache.has(assetPath)) return inMemoryCache.get(assetPath)!;
  if (inMemoryCache.has(fileName)) return inMemoryCache.get(fileName)!;
  if (inMemoryCache.has(normalized)) return inMemoryCache.get(normalized)!;

  // 2. Check standard imageX mappings
  const matchNum = normalized.match(/image(\d+)/i);
  if (matchNum) {
    const num = matchNum[1];
    if (inMemoryCache.has(`image${num}.png`)) return inMemoryCache.get(`image${num}.png`)!;
    if (inMemoryCache.has(`image${num}`)) return inMemoryCache.get(`image${num}`)!;
  }

  // 3. Fallback to localStorage check
  if (typeof window !== 'undefined') {
    try {
      const ls = localStorage.getItem(`custom_asset_${fileName}`) ||
                 localStorage.getItem(`custom_asset_${normalized}`) ||
                 localStorage.getItem(`custom_infographic_${fileName}`);
      if (ls) {
        inMemoryCache.set(fileName, ls);
        inMemoryCache.set(normalized, ls);
        return ls;
      }
    } catch {
      // ignore
    }
  }

  return null;
}

// Match uploaded file to expected landmark image
export function matchUploadedFileToExpected(file: File, expectedFileName: string): string {
  if (expectedFileName) return expectedFileName;
  const normalized = normalizeKey(file.name);
  const match = normalized.match(/image(\d+)/i);
  if (match) {
    return `image${match[1]}.png`;
  }
  return file.name;
}
