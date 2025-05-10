import rawDetails from './projects.json';

export type ContentItem =
  | { type: 'text'; value: string }
  | { type: 'subheading'; value: string };

export interface ProjectSection {
  title: string;
  content: ContentItem | ContentItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo?: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  logo: string;
  shortDescription: string;
  fullDescription: string;
  sections: ProjectSection[];
  team: TeamMember[];
  url?: string;
}

// Cast the imported JSON to our ProjectDetail[] type:
export const projectDetails = rawDetails as ProjectDetail[];
