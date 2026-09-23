"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { BlogFooter } from "@/components/blog-footer";
import { BlogNavbar } from "@/components/blog-navbar";

export function LibraryFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersivePresentation = pathname.includes("/courses/") && pathname.includes("/present/");

  return (
    <div className="flex min-h-screen flex-col">
      {!immersivePresentation && <BlogNavbar />}
      <div className="min-w-0 flex-1">{children}</div>
      {!immersivePresentation && <BlogFooter />}
    </div>
  );
}
