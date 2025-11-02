import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Golu aur Molu | Kitchen Adventures",
  description: "Animated kahaani of Golu aur Molu ki kitchen mein masti, Hindi voiceover ke saath.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body className={`${baloo.className} min-h-screen bg-kitchenFloor text-stone-900`}>
        {children}
      </body>
    </html>
  );
}
