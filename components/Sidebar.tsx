"use client";

import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="w-1/4 bg-zinc-900 sticky min-h-screen">
      <div className="fixed w-1/4">
        <nav className="w-full p-4">
          <SidebarItem name="Hiragana" />
        </nav>
      </div>
    </div>
  );
};
