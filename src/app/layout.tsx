import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi Portafolio | Desarrollador Web",
  description: "Portafolio profesional de desarrollo web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} min-h-screen bg-[url('/images/windows7bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        {children}
      </body>
    </html>
  );
}
