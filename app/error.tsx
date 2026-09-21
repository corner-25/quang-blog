"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground sm:text-3xl">
        Có lỗi xảy ra khi tải trang
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-md">
        Hệ thống gặp sự cố tạm thời khi hiển thị nội dung này. Bạn vui lòng bấm nút bên dưới để thử lại.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
      >
        Tải lại trang
      </button>
    </div>
  );
}
