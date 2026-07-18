import React from "react";
import { BlogNavbar } from "@/components/blog-navbar";
import { BlogFooter } from "@/components/blog-footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <BlogNavbar />
      <div className="flex-grow">
        {children}
      </div>
      <BlogFooter />
    </div>
  );
}
