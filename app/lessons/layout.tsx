import React from "react";
import { Sidebar } from "@/components/Sidebar";

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex dark:bg-zinc-900 bg-zinc-300">
      <Sidebar />
      <main className="p-20">
        <article className="prose lg:prose-xl dark:prose-invert">
          {children}
        </article>
      </main>
    </div>
  );
}
