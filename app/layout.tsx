import type { Metadata } from "next";
import { Anton, Permanent_Marker, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SC Braga Day 2026 · 18.07.2026 · Visit Braga",
  description:
    "Braga Day 2026 -a grande festa dos Gverreiros. Jogo de pré-época SC Braga x Celta de Vigo, apresentação do plantel e a Roleta Visit Braga com prémios. 18 de julho, Estádio Municipal de Braga.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <body
        className={`${anton.variable} ${marker.variable} ${archivo.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
