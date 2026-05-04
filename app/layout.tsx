import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dương Hữu Quang — AI Engineer & Data Scientist",
    template: "%s · Dương Hữu Quang",
  },
  description:
    "Blog cá nhân của Dương Hữu Quang — AI Engineer, Data Scientist tại Bệnh viện Đại học Y Dược TP.HCM. Nơi chia sẻ dự án, nghiên cứu, suy ngẫm và những cột mốc kỷ niệm.",
  keywords: [
    "Dương Hữu Quang",
    "AI Engineer",
    "Data Scientist",
    "Bách Khoa",
    "Bệnh viện Đại học Y Dược",
    "Clinical Decision Support",
    "Blog cá nhân",
  ],
  authors: [{ name: "Dương Hữu Quang" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Dương Hữu Quang — AI Engineer & Data Scientist",
    description:
      "Hành trình của một AI Engineer / Data Scientist — từ giảng đường Bách Khoa đến bệnh viện. Dự án, nghiên cứu, nhân sinh quan và kỷ niệm.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
