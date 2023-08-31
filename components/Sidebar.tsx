"use client";

import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="w-1/4 bg-zinc-900 sticky min-h-screen">
      <div className="fixed w-1/4">
        <nav className="w-full p-4">
          <SidebarItem
            name="Hiragana"
            subitems={["Hiragana - Part 01", "Hiragana Flashcards 1"]}
          />
          <SidebarItem
            name="Katakana"
            subitems={["Katakana - Part 01", "Katakana Flashcards 1"]}
          />
        </nav>
      </div>
    </div>
  );
};
