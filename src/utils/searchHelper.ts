import { PlaceItem } from '../types';

/**
 * Normalizes a string by converting to lowercase, removing Vietnamese diacritics,
 * and collapsing extra whitespaces for high-accuracy search.
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return '';
  let result = str.toLowerCase();
  // Normalize unicode decomposition and strip accents
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Specifically handle Vietnamese 'đ' / 'Đ'
  result = result.replace(/đ/g, 'd').replace(/Đ/g, 'd');
  // Collapse whitespace
  return result.replace(/\s+/g, ' ').trim();
}

export interface SearchablePlace {
  place: PlaceItem;
  groupName: string;
  groupId?: string;
  slideIndex: number;
}

export interface SearchResultItem extends SearchablePlace {
  score: number;
  matchedTokens: string[];
}

/**
 * Searches places with Vietnamese accent insensitivity, multi-token matching,
 * and relevance ranking for high-speed, accurate results.
 */
export function searchPlaces(
  items: SearchablePlace[],
  query: string
): SearchResultItem[] {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return items.map(item => ({ ...item, score: 0, matchedTokens: [] }));
  }

  const rawLower = cleanQuery.toLowerCase();
  const normQuery = removeVietnameseTones(cleanQuery);
  const rawTokens = rawLower.split(/\s+/).filter(Boolean);
  const normTokens = normQuery.split(/\s+/).filter(Boolean);

  const results: SearchResultItem[] = [];

  for (const item of items) {
    const { place, groupName } = item;
    
    // Prepare raw and normalized searchable fields
    const rawName = (place.name || '').toLowerCase();
    const normName = removeVietnameseTones(place.name || '');

    const rawLoc = (place.location || '').toLowerCase();
    const normLoc = removeVietnameseTones(place.location || '');

    const rawIntro = (place.shortIntro || '').toLowerCase();
    const normIntro = removeVietnameseTones(place.shortIntro || '');

    const rawGroup = (groupName || '').toLowerCase();
    const normGroup = removeVietnameseTones(groupName || '');

    const rawYear = (place.establishedYear || '').toLowerCase();
    const rawHist = (place.historicalValue || '').toLowerCase();
    const normHist = removeVietnameseTones(place.historicalValue || '');

    const rawClass = (place.classification || '').toLowerCase();
    const normClass = removeVietnameseTones(place.classification || '');

    let score = 0;
    const matchedTokens: string[] = [];

    // 1. Exact Name match gets ultimate priority
    if (rawName === rawLower || normName === normQuery) {
      score += 2000;
    } else if (rawName.startsWith(rawLower) || normName.startsWith(normQuery)) {
      score += 1000;
    } else if (rawName.includes(rawLower) || normName.includes(normQuery)) {
      score += 600;
    }

    // 2. Token matches in place Name
    let allTokensInName = true;
    for (let i = 0; i < normTokens.length; i++) {
      const nt = normTokens[i];
      const rt = rawTokens[i];
      if (rawName.includes(rt) || normName.includes(nt)) {
        score += 250;
        matchedTokens.push(rt);
      } else {
        allTokensInName = false;
      }
    }
    if (normTokens.length > 1 && allTokensInName) {
      score += 500;
    }

    // 3. Location matches (districts, cities, provinces like Bình Dương, Vũng Tàu, Q.1)
    if (rawLoc.includes(rawLower) || normLoc.includes(normQuery)) {
      score += 350;
    } else {
      for (let i = 0; i < normTokens.length; i++) {
        if (rawLoc.includes(rawTokens[i]) || normLoc.includes(normTokens[i])) {
          score += 120;
          matchedTokens.push(rawTokens[i]);
        }
      }
    }

    // 4. Established Year matches (e.g., 1877, 1863, 1966)
    if (rawYear && (rawYear.includes(rawLower) || rawYear.includes(normQuery))) {
      score += 300;
    }

    // 5. Classification & Group matches (e.g. Di tích, Lịch sử, Kiến trúc, Chợ)
    if (rawGroup.includes(rawLower) || normGroup.includes(normQuery)) {
      score += 200;
    }
    if (rawClass.includes(rawLower) || normClass.includes(normQuery)) {
      score += 200;
    }

    // 6. Short intro & Historical notes
    if (rawIntro.includes(rawLower) || normIntro.includes(normQuery)) {
      score += 150;
    } else {
      for (let i = 0; i < normTokens.length; i++) {
        if (rawIntro.includes(rawTokens[i]) || normIntro.includes(normTokens[i])) {
          score += 50;
          matchedTokens.push(rawTokens[i]);
        }
      }
    }

    if (rawHist.includes(rawLower) || normHist.includes(normQuery)) {
      score += 100;
    }

    // Require that all search tokens match at least somewhere across the place's profile
    const combinedNormText = `${normName} ${normLoc} ${normIntro} ${normGroup} ${rawYear} ${normClass} ${normHist}`;
    const allTokensFound = normTokens.every(token => combinedNormText.includes(token));

    if (allTokensFound && score > 0) {
      results.push({
        ...item,
        score,
        matchedTokens: Array.from(new Set(matchedTokens))
      });
    }
  }

  // Sort strictly by relevance score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}
