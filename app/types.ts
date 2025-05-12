// app/types.ts

export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface SubmitInvestorResponse {
  success: boolean;
  message?: string;
}

export interface Project {
  id: string;
  name: string;
  logo: string;
  shortDescription: string;
}
