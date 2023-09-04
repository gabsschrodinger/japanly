"use client";

import React from "react";
import { MenuSubitem } from "@/lib/navigationMenuData";
import Link from "next/link";
import { useState } from "react";

type Props = {
  name: string;
  subitems: MenuSubitem[];
};

export const SidebarItem = ({ name, subitems }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-full">
      <div
        className={
          (active ? "dark:bg-zinc-800 bg-zinc-400 " : "") +
          "p-3 w-full dark:hover:bg-zinc-800 hover:bg-zinc-400 rounded cursor-pointer flex duration-300"
        }
        onClick={() => setActive((prev) => !prev)}
        data-testid="subitems-container-button"
      >
        <div>{name}</div>
        <div
          className={
            (active ? "rotate-90 " : "") + "ml-auto duration-300 ease-in-out"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      <div
        className={(active ? "flex flex-col " : "hidden ") + "ml-3"}
        data-testid="subitems-container"
      >
        {subitems.map((subitem, index) => (
          <Link
            href={subitem.url}
            className="py-2 mt-2 rounded dark:hover:bg-zinc-800 hover:bg-zinc-400 w-full cursor-pointer px-3 duration-300"
            key={index}
          >
            {subitem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
