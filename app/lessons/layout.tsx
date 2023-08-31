import { Sidebar } from "@/components/Sidebar";

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-20">
        <article className="prose lg:prose-xl dark:prose-invert">
          {children}
        </article>
      </main>
    </div>
  );
}
