"use client";

import { captalizeWord } from "@/lib/utils";
import Link from "next/link";

type Option = {
  position: "next" | "previous";
  url: string;
  title: string;
};

type Props = {
  next?: Option;
  previous?: Option;
};

export const NextOption = ({ next, previous }: Props) => {
  return (
    <div className="flex !mt-20">
      {previous && (
        <Link
          href={previous.url}
          className="no-underline cursor-pointer mr-auto w-2/5 border rounded p-2 flex justify-end flex-col items-end h-fit"
        >
          <p className="h-fit !my-0 flex">{captalizeWord(previous.position)}</p>
          <p className="h-fit !mb-0 mt-2 flex">&lt;&lt; {previous.title}</p>
        </Link>
      )}
      {next && (
        <Link
          href={next.url}
          className="no-underline cursor-pointer ml-auto w-2/5 border rounded p-2 flex justify-end flex-col items-end h-fit"
        >
          <p className="h-fit !my-0 flex">{captalizeWord(next.position)}</p>
          <p className="h-fit !mb-0 mt-2 flex">{next.title} &gt;&gt;</p>
        </Link>
      )}
    </div>
  );
};
