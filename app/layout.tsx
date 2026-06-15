import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";
import ScrollToTop from "./scrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#02010F] text-[#D6D0DC]">
        <ScrollToTop />
        <Navbar />
        <Toaster richColors position="top-center" />
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
