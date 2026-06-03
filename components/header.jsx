"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header({ menu2 }) {
  const path = usePathname();
  return (
    <header className="bg-white/75 sticky top-0 z-999 shadow-xl shadow-gray-200/60 flex justify-between items-center px-10 py-4">
      <div className="">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          ورزش روز
        </h1>
      </div>
      <div className="">
        <ul className="flex items-center gap-x-2">
          {menu2?.map((item, index) => (
            <li key={`item-${index + 1}`} className="">
              <Link
                href={item.path}
                className={`${path === item.path ? "bg-orange-600 text-white hover:bg-orange-600" : "bg-transparent hover:bg-gray-300"}  px-3.5 rounded-md py-1.5 transition-colors duration-200 ease-linear`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
