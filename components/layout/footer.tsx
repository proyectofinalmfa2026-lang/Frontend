"use client";

import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandReddit,
  IconBrandX,
} from "@tabler/icons-react";

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
                href="/series"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Series
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
