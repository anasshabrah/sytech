// components/TeamMemberCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo?: string;
}

/** Accessible team‑member card with semantic <article> */
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <article className="flex flex-col items-center gap-2 rounded-lg bg-base p-6 text-center shadow ring-1 ring-brand-100">
    {member.photo ? (
      <Image
        src={member.photo}
        alt={`صورة ${member.name}`}
        width={100}
        height={100}
        className="h-20 w-20 rounded-full object-cover"
        loading="lazy"
      />
    ) : (
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <User className="h-8 w-8 text-gray-400" aria-hidden />
      </span>
    )}
    <h3 className="m-0 text-lg font-semibold leading-none">{member.name}</h3>
    <p  className="m-0 text-sm text-gray-500">{member.role}</p>
  </article>
);

export default TeamMemberCard;
