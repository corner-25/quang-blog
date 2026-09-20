import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import { MotionProvider } from "@/components/motion-provider";
import { ScrollProgress } from "@/components/scroll-progress";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${beVietnam.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <MotionProvider>
            <ScrollProgress />
            <Cursor />
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
