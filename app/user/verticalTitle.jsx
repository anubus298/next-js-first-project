"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function VerticalTitle() {
  const pathname = usePathname();
  const [title, settitle] = useState("");
  useEffect(() => {
    const match = pathname.match(/\/user\/([^\/]+)/);
    settitle(match[1]);
  }, [pathname]);

  return (
    <div className="bg-main text-3xl text-secondary w-full p-6 font-black text-center">
      <p>{title[0]?.toUpperCase() + title.slice(1, title.length)}</p>
    </div>
  );
}

export default VerticalTitle;
