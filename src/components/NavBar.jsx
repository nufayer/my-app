"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from 'lucide-react';
import { Clock9 } from 'lucide-react';
import { ChartSpline } from 'lucide-react';

function getNavButtonClass(isActive) {
  return isActive
    ? "btn border-none rounded bg-[#244D3F] text-white hover:bg-green-900"
    : "btn border rounded border-slate-200 bg-white text-slate-700 hover:bg-slate-100";
}

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="navbar bg-base-100 px-4 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>

        <Link href="/" className="btn btn-ghost text-2xl font-bold">
          KeenKeeper
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex" />

      <div className="navbar-end gap-2">
        <Link href="/" className={getNavButtonClass(pathname === "/")}>
        <House />
          Home
        </Link>
        <Link
          href="/timeline"
          className={getNavButtonClass(pathname.startsWith("/timeline"))}>
          <Clock9 />
          Timeline
        </Link>
        <Link
          href="/stats"
          className={getNavButtonClass(pathname.startsWith("/stats"))}>
          <ChartSpline />
          Stats
        </Link>
      </div>
    </div>
  );
}
