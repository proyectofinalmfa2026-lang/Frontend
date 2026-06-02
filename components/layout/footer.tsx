"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#22194A] bg-[#02010F]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-serif text-[#D6D0DC]">
              Cine<span className="text-[#C13A82]">Sphere</span>
            </h3>

            <p className="mt-3 text-sm text-[#7B7497] leading-relaxed">
              Descubre, califica y comparte tus películas favoritas con la
              comunidad.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-semibold text-[#D6D0DC] mb-4">Navegación</h4>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/movieCard"
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
                href="/watchlistCard"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Watchlist
              </Link>
            </div>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold text-[#D6D0DC] mb-4">Recursos</h4>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/about"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Acerca de
              </Link>

              <Link href="/faq" className="text-[#7B7497] hover:text-[#8C63C9]">
                FAQ
              </Link>

              <Link
                href="/contact"
                className="text-[#7B7497] hover:text-[#8C63C9]"
              >
                Contacto
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
          <div>
            <h4 className="font-semibold text-[#D6D0DC] mb-4">Legal</h4>

            <div className="flex flex-col gap-3 text-sm">
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
        </div>

        {/* Bottom */}
        <div className="border-t border-[#22194A] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#7B7497]">
            © 2026 CineSphere. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-[#7B7497] hover:text-[#C13A82]">
              GitHub
            </a>

            <a href="#" className="text-[#7B7497] hover:text-[#C13A82]">
              Discord
            </a>

            <a href="#" className="text-[#7B7497] hover:text-[#C13A82]">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
