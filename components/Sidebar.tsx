"use client";

import React from "react";
import { menuData } from "@/lib/navigationMenuData";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="dark:text-white w-1/4 dark:bg-zinc-900 bg-zinc-300 sticky min-h-screen border-r">
      <div className="fixed w-1/4">
        <nav className="w-full p-4">
          {menuData.map((item, index) => (
            <SidebarItem
              key={index}
              name={item.name}
              subitems={item.subitems}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};
