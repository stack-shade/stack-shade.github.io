import React from "react";
import { LibraryFrame } from "@/components/library-frame";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LibraryFrame>{children}</LibraryFrame>;
}
