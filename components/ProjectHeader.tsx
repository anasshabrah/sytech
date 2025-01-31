// components/ProjectHeader.tsx

"use client";

import React, { useState } from "react";
import Header from "@/components/Header";

interface ProjectHeaderProps {
  showNavigation: boolean;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ showNavigation }) => {
  // Initialize navOpen with the value of showNavigation
  const [navOpen, setNavOpen] = useState(showNavigation);

  return <Header setNavOpen={setNavOpen} navOpen={navOpen} />;
};

export default ProjectHeader;
