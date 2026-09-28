"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Trang chủ "Hệ phân tử" được thiết kế riêng cho tông trắng – xanh da trời.
  const pathname = usePathname();
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      forcedTheme={pathname === "/" ? "light" : undefined}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
