// app/data/projectsData.ts

import { Project } from "@/app/types";

export const projects: Project[] = [
  {
    id: "saiks", // Changed from "project-1" to "saiks" to match projectDetailsData.ts
    name: "سايكس",
    logo: "/images/projects/syex-logo.png", // Updated path to match projectDetailsData.ts
    shortDescription: "منصة إلكترونية تربط المنتجين السوريين بالمشترين الدوليين.",
  },
  // ... Add other projects as needed
];
