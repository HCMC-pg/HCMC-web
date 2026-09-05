export interface PlaceItem {
  name: string;
  shortIntro: string;
  location: string;
  mapUrl?: string;
  secondaryMapUrl?: string;
  historicalValue: string;
  significance: string;
  image: string;
  videos: string[];
  infographic: string;
  aiPrompts: string[];
  coordinates?: { lat: number; lng: number };
  region?: string;
  officialSource?: string;
  verifiedOfficial?: boolean;
  establishedYear?: string;
  architectOrOrigin?: string;
  classification?: string;
}

export interface AboutDetails {
  mission: string;
  contentScope: string;
  aiCompanion: string;
  gamification?: string;
  targetAudience: string;
  foundersStory: string;
  foundersCount: number;
}

export interface SlideData {
  id: string; // S1 to S9
  slideNumber: number;
  category: string;
  primaryTitle: string;
  secondaryTitle: string;
  bodyContent: string;
  keyHighlights: string[];
  image?: string;
  badge?: string;
  places?: PlaceItem[];
  aboutDetails?: AboutDetails;
}

export interface ProjectInfo {
  name: string;
  fullName: string;
  slogan: string;
  quote: string;
  secondaryQuote: string;
  contactEmail: string;
}

export interface ContentData {
  projectInfo: ProjectInfo;
  slides: SlideData[];
}
