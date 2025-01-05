// app/public/blogdata.ts
import { Blog } from "@/app/types";
import heroImage from "@/public/images/hero.png"; // Adjust the path as necessary

export const blogData: Blog[] = [
  {
    id: 1,
    title: "Understanding TypeScript in Next.js",
    date: "2024-04-20",
    time: "8 min",
    desc: "An in-depth look at integrating TypeScript with Next.js for better type safety and developer experience.",
    tags: ["TypeScript", "Next.js", "JavaScript"],
    image: heroImage, // Ensure this is correctly imported as StaticImageData
    author: "Jenny Wilson",
    tableOfContents: [
      { id: "1", title: "Introduction" },
      { id: "2", title: "Setting Up TypeScript" },
      { id: "3", title: "Benefits of Type Safety" },
      { id: "4", title: "Conclusion" },
    ],
    sections: {
      understanding: {
        title: "Understanding TypeScript",
        content: "Content for understanding TypeScript...",
      },
      crafting: {
        title: "Crafting with TypeScript",
        content: "Content for crafting with TypeScript...",
      },
      showcasing: {
        title: "Showcasing Projects",
        content: "Content for showcasing projects...",
      },
      conclusion: {
        title: "Conclusion",
        content: "Final thoughts on TypeScript in Next.js...",
      },
    },
    quote: "TypeScript adds type safety to JavaScript, enhancing developer productivity.",
    additionalContent: "Additional resources and links.",
  },
  // Add more blog objects as needed
];
