// app/types.ts
import { StaticImageData } from 'next/image';

export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface SubmitInvestorResponse {
  success: boolean;
  message?: string;
}

export interface Project {
  id: string; // Unique identifier for dynamic routing
  name: string;
  logo: string; // Path to the project logo image
  shortDescription: string;
}