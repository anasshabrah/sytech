"use client";
import Image from "next/image";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import blogVideo from "@/public/images/blog-video.png";
import youtube from "@/public/images/youtube.png";

const DetailsVideo = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="mb-4 mb-xl-5 position-relative blog-video">
        <Image src={blogVideo} className="w-100 img-fluid rounded-3" alt="Blog Video" />
        <span onClick={() => setOpen(true)} className="youtube">
          <Image src={youtube} alt="Play Video" />
        </span>
      </div>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="dImgZ_AH7uA"
        onClose={() => setOpen(false)}
        autoplay={false}
      />
    </>
  );
};

export default DetailsVideo;
