"use client";

import { captalizeWord } from "@/lib/utils";
import Link from "next/link";

type Props = {
  position: "next" | "previous";
  url: string;
  title: string;
};

export const NextOption = ({ position, title, url }: Props) => {
  return (
    <div className="flex !mt-20">
      <Link
        href={url}
        className="no-underline cursor-pointer ml-auto w-2/5 border rounded p-2 flex justify-end flex-col items-end h-fit"
      >
        <p className="h-fit !my-0 flex">{captalizeWord(position)}</p>
        <p className="h-fit !mb-0 mt-2 flex">{title} &gt;&gt;</p>
      </Link>
    </div>
  );
};
