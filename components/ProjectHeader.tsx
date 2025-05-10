"use client";

import React, { useState } from "react";
import Header from "@/components/Header";

const ProjectHeader: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);

  return <Header navOpen={navOpen} setNavOpen={setNavOpen} />;
};

export default ProjectHeader;
