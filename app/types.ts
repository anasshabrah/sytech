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
