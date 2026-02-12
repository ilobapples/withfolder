export interface Project {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  imageUrl: string;
  category: string;
  year: string;
  spotifyEmbedUrl?: string;
  pdfUrl?: string;
  processImages?: { url: string; label: string }[];
}

export interface Memory {
  id: string;
  url: string;
  caption: string;
}

export interface ArchiveAsset {
  type: string; // 'image' | 'video' | 'zine'
  url: string;
  label: string;
  thumbnailUrl?: string;
}

export interface ArchiveProject {
  id: string;
  title: string;
  year: string;
  description: string;
  assets: ArchiveAsset[];
}