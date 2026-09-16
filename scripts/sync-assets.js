import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ensure destination directories exist
const publicDir = path.join(rootDir, 'public');
const publicAssetsDir = path.join(publicDir, 'assets');
const publicInfographicDir = path.join(publicAssetsDir, 'Infographic');
const publicRootInfographicDir = path.join(publicDir, 'Infographic');

[publicDir, publicAssetsDir, publicInfographicDir, publicRootInfographicDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function copyFileSafe(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return;
  try {
    if (fs.existsSync(destPath)) {
      const srcStat = fs.statSync(srcPath);
      const destStat = fs.statSync(destPath);
      // If destination is already same size or larger, preserve
      if (destStat.size >= srcStat.size) return;
    }
    fs.copyFileSync(srcPath, destPath);
    console.log(`[sync-assets] Copied: ${path.basename(srcPath)} -> ${destPath.replace(rootDir, '')}`);
  } catch (err) {
    console.error(`[sync-assets] Error copying ${srcPath} to ${destPath}:`, err.message);
  }
}

// 1. Copy full-res images from Infographic folder
const infographicSrcDir = path.join(rootDir, 'src/assets/images/Infographic');
if (fs.existsSync(infographicSrcDir)) {
  const files = fs.readdirSync(infographicSrcDir);
  for (const file of files) {
    if (/\.(png|jpe?g|webp)$/i.test(file)) {
      const fullSrc = path.join(infographicSrcDir, file);
      copyFileSafe(fullSrc, path.join(publicInfographicDir, file));
      copyFileSafe(fullSrc, path.join(publicRootInfographicDir, file));
      copyFileSafe(fullSrc, path.join(publicAssetsDir, file));
      copyFileSafe(fullSrc, path.join(publicDir, file));
    }
  }
}

// 2. Copy KHKT images
const khktSrcDir = path.join(rootDir, 'src/assets/images/KHKT');
if (fs.existsSync(khktSrcDir)) {
  const files = fs.readdirSync(khktSrcDir);
  for (const file of files) {
    if (/\.(png|jpe?g|webp)$/i.test(file)) {
      const fullSrc = path.join(khktSrcDir, file);
      copyFileSafe(fullSrc, path.join(publicAssetsDir, file));
      copyFileSafe(fullSrc, path.join(publicDir, file));
    }
  }
}

// 3. Copy other assets from src/assets/images
const generalImagesDir = path.join(rootDir, 'src/assets/images');
if (fs.existsSync(generalImagesDir)) {
  const files = fs.readdirSync(generalImagesDir);
  for (const file of files) {
    const fullSrc = path.join(generalImagesDir, file);
    if (fs.statSync(fullSrc).isFile() && /\.(png|jpe?g|webp|svg)$/i.test(file)) {
      copyFileSafe(fullSrc, path.join(publicAssetsDir, file));
    }
  }
}

// 4. Copy any images from root directory (e.g. user uploaded directly to root)
const rootFiles = fs.readdirSync(rootDir);
for (const file of rootFiles) {
  if (/\.(png|jpe?g|webp)$/i.test(file)) {
    const fullSrc = path.join(rootDir, file);
    if (fs.statSync(fullSrc).isFile()) {
      if (file.startsWith('image') && file.endsWith('.png')) {
        copyFileSafe(fullSrc, path.join(publicInfographicDir, file));
        copyFileSafe(fullSrc, path.join(publicRootInfographicDir, file));
      }
      copyFileSafe(fullSrc, path.join(publicAssetsDir, file));
      copyFileSafe(fullSrc, path.join(publicDir, file));
    }
  }
}

console.log('[sync-assets] Asset sync complete! All assets safely preserved for GitHub export.');
