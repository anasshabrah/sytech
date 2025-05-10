import { projectDetails } from './projectDetailsData';
import type { Project } from '@/app/types';

export const projects: Project[] = projectDetails.map(
  ({ id, name, logo, shortDescription }) => ({
    id,
    name,
    logo,
    shortDescription,
  })
);
