import TeamCard from "@/components/team/teamCard";

const TEAM = [
  {
    name: "Alejandro Mirena",
    role: "Full Stack Developer",
    github: "https://github.com/Alejandro-Mirena",
    linkedin:
      "https://www.linkedin.com/in/alejandro-mirena-hidalgo/?locale=es-ES",
    image: "https://github.com/Alejandro-Mirena.png",
    location: "Lima, Perú",
    bio: "Desarrollador Full Stack apasionado por construir experiencias digitales únicas y funcionales.",
    skills: ["React", "Next.js", "NestJS", "TypeScript", "PostgreSQL"],
    githubStats: { repos: 7, followers: 0 },
  },
  {
    name: "Matias Rodriguez",
    role: "Full Stack Developer",
    github: "https://github.com/MorningstarDev",
    linkedin: "https://www.linkedin.com/in/matiasrodriguez-/",
    image: "https://github.com/MorningstarDev.png",
    location: "Argentina",
    bio: "Desarrollador Full Stack apasionado por crear aplicaciones web modernas, escalables y centradas en la experiencia del usuario.",
    skills: ["React", "Next.js", "NestJS", "TypeScript", "PostgreSQL"],
    githubStats: { repos: 3, followers: 0 },
  },
  {
    name: "Felipe Paez",
    role: "Full Stack Developer",
    github: "https://github.com/fepaez",
    linkedin: "https://www.linkedin.com/in/felipe-paez-ibaceta/",
    image: "https://github.com/fepaez.png",
    location: "Chile",
    bio: "Full Stack Developer con enfoque en Backend.",
    skills: ["React", "Next.js", "NestJS", "TypeScript", "PostgreSQL"],
    githubStats: { repos: 5, followers: 0 },
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#02010F] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-xs text-[#5C5470] uppercase tracking-[0.2em] font-medium">
            Conoce al equipo
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#D6D0DC] mt-3">
            Creadores de CineSphere
          </h1>
          <div className="w-16 h-0.5 bg-linear-to-r from-[#C13A82] to-[#8C63C9] mx-auto mt-4" />
          <p className="text-sm text-[#7B7497] mt-4 max-w-lg mx-auto">
            Detrás de cada película hay un equipo apasionado por el cine y la
            tecnología.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {TEAM.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </main>
  );
}
