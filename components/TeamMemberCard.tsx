// components/TeamMemberCard.tsx

"use client";

import React from "react";
import Image from "next/image";
import styles from "@/styles/TeamMemberCard.module.scss";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className={styles.card}>
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`${member.name} Photo`}
          width={100}
          height={100}
          className={styles.photo}
          loading="lazy"
        />
      ) : (
        <div className={styles.placeholder}>
          {member.name.charAt(0)}
        </div>
      )}
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
    </div>
  );
};

export default TeamMemberCard;
