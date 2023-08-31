"use client";

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
          (active ? "bg-zinc-800 " : "") +
          "p-3 w-full hover:bg-zinc-800 rounded cursor-pointer flex"
        }
        onClick={() => setActive((prev) => !prev)}
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

      <div className={(active ? "flex flex-col " : "hidden ") + "ml-3"}>
        {subitems.map((subitem, index) => (
          <Link
            href={subitem.url}
            className="py-2 mt-2 rounded hover:bg-zinc-800 w-full cursor-pointer px-3"
            key={index}
          >
            {subitem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
