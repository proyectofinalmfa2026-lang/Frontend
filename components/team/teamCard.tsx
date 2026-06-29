"use client";

interface TeamCardProps {
  name: string;
  role: string;
  github: string;
  linkedin: string;
  image?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  githubStats?: { repos?: number; followers?: number };
}

export default function TeamCard({
  name,
  role,
  github,
  linkedin,
  image,
  location,
  bio,
  skills,
  githubStats,
}: TeamCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-6 flex flex-col items-center w-72 hover:border-[#C13A82]/40 transition-all duration-300 group">
      {/* Avatar */}
      <div className="relative mb-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#22194A] group-hover:border-[#C13A82]/50 transition-colors"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-2xl font-bold text-white border-2 border-[#22194A] group-hover:border-[#C13A82]/50 transition-colors">
            {initials}
          </div>
        )}
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0E0A2B] flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Name & Role */}
      <div className="text-center mb-3">
        <p className="text-base font-semibold text-[#D6D0DC] group-hover:text-[#C13A82] transition-colors">
          {name}
        </p>
        <p className="text-xs text-[#8C63C9] font-medium mt-0.5">{role}</p>
        {location && (
          <p className="text-[15px] text-[#5C5470] mt-1 flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </p>
        )}
      </div>

      {/* Bio */}
      {bio && (
        <p className="text-xs text-[#7B7497] text-center leading-relaxed mb-4 px-1">
          {bio}
        </p>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-[12px] px-2 py-0.5 rounded-full bg-[#22194A]/50 text-[#7B7497] border border-[#22194A]"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#22194A] w-full justify-center">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-[#22194A]/50 flex items-center justify-center text-[#7B7497] hover:text-[#D6D0DC] hover:bg-[#22194A] transition-all"
          title="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-[#22194A]/50 flex items-center justify-center text-[#7B7497] hover:text-[#D6D0DC] hover:bg-[#22194A] transition-all"
          title="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
