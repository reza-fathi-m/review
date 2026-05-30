import Header from "@/components/header";
import React from "react";

const menu = [
  { title: "خانه", path: "/" },
  { title: "ورزش ها", path: "/sports" },
];

export default function SiteLayout({ children }) {
  return (
    <>
      <Header menu2={menu} />
      <main className="px-10 pt-10">{children}</main>
    </>
  );
}
