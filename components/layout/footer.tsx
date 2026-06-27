"use client";

import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandReddit,
  IconBrandX,
} from "@tabler/icons-react";

function TeamCard({
  name,
  role,
  github,
  linkedin,
  image,
}: {
  name: string;
  role: string;
  github: string;
  linkedin: string;
  image?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-4 flex flex-col items-center gap-3 w-44 hover:border-[#C13A82]/30 transition-all duration-300 group">
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#22194A]"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C13A82] to-[#8C63C9] flex items-center justify-center text-xs font-bold text-white border-2 border-[#22194A]">
            {initials}
          </div>
        )}
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0E0A2B] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs font-medium text-[#D6D0DC] group-hover:text-[#C13A82] transition-colors leading-tight">
          {name}
        </p>
        <p className="text-[9px] text-[#5C5470] mt-0.5">{role}</p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-md bg-[#22194A]/50 flex items-center justify-center text-[#7B7497] hover:text-[#D6D0DC] hover:bg-[#22194A] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-md bg-[#22194A]/50 flex items-center justify-center text-[#7B7497] hover:text-[#D6D0DC] hover:bg-[#22194A] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#22194A] bg-[#02010F]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* CTA */}
        <div className="mb-12 text-center ">
          <span className="text-[#C13A82] text-sm font-medium animate-pulse">
            ✦ Para amantes del cine
          </span>

          <h3 className="mt-3 text-xl md:text-2xl font-semibold text-[#D6D0DC]">
            Descubre tu próxima película favorita
          </h3>

          <p className="mt-3 text-sm md:text-base text-[#7B7497] max-w-2xl mx-auto">
            Explora nuevas historias, crea listas personalizadas y comparte tus
            opiniones con una comunidad apasionada por el cine.
          </p>

          <Link
            href="/movies"
            className="
              inline-flex
              mt-5
              text-[#8C63C9]
              hover:text-[#C13A82]
              transition-colors
              text-sm
              font-medium
            "
          >
            Explorar películas →
          </Link>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {/* Navegación */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-[#D6D0DC] mb-4">Navegación</h4>

            <div className="flex flex-col gap-3 text-sm items-center">
              <Link
                href="/movies"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Películas
              </Link>

              <Link
                href="/community"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Comunidad
              </Link>

              <Link
                href="/watchlist"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Watchlist
              </Link>
            </div>
          </div>

          {/* Recursos */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-[#D6D0DC] mb-4">Recursos</h4>

            <div className="flex flex-col gap-3 text-sm items-center">
              <Link
                href="/about"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Acerca de
              </Link>

              <Link
                href="/support"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Soporte
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-[#D6D0DC] mb-4">Legal</h4>

            <div className="flex flex-col gap-3 text-sm items-center">
              <Link
                href="/terms"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Términos y Condiciones
              </Link>

              <Link
                href="/privacy"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>

          {/* Cuenta */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-[#D6D0DC] mb-4">Cuenta</h4>

            <div className="flex flex-col gap-3 text-sm items-center">
              <Link
                href="/Login"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Iniciar sesión
              </Link>

              <Link
                href="/Register"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Registrarse
              </Link>

              <Link
                href="/profile"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Mi perfil
              </Link>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="border-t border-[#22194A] mt-10 pt-10">
          <p className="text-xs text-[#5C5470] uppercase tracking-[0.2em] font-medium text-center mb-6">
            Creado por
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <TeamCard
              name="Alejandro Mirena"
              role="Full Stack Developer"
              github="https://github.com/Alejandro-Mirena"
              linkedin="https://www.linkedin.com/in/alejandro-mirena-hidalgo/?locale=es-ES"
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#22194A] mt-10 pt-6 flex flex-col items-center gap-5">
          <p className="text-sm text-[#7B7497] text-center">
            © 2026 CineSphere. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com"
              className="text-[#7B7497] hover:text-[#C13A82] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandFacebook size={22} />
            </a>

            <a
              href="https://instagram.com"
              className="text-[#7B7497] hover:text-[#C13A82] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandInstagram size={22} />
            </a>

            <a
              href="https://reddit.com"
              className="text-[#7B7497] hover:text-[#C13A82] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandReddit size={22} />
            </a>

            <a
              href="https://x.com"
              className="text-[#7B7497] hover:text-[#C13A82] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandX size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
