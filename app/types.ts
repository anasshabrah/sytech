// app/types.ts
import { StaticImageData } from 'next/image';

export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface BlogSection {
  title: string;
  content: string;
}

export interface BlogSections {
  understanding: BlogSection;
  crafting: BlogSection;
  showcasing: BlogSection;
  conclusion: BlogSection;
}

export interface Blog {
  id: number;
  title: string;
  date: string;
  time: string;
  desc: string;
  tags: string[];
  image: StaticImageData;
  author: string;
  tableOfContents: TableOfContentsItem[];
  sections: BlogSections;
  quote: string;
  additionalContent: string;
}

export interface BlogDetailsPageProps {
  params: {
    title: string;
  };
}

export interface SubmitInvestorResponse {
  success: boolean;
  message?: string;
}
