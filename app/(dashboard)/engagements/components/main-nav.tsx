"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Engagements Scheduled", href: "/engagements/scheduled" },
  { label: "Engagements Not Scheduled", href: "/engagements/not-scheduled" },
];
export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navLinks.map((navLink, index) => (
        <Link
          key={index}
          href={navLink.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathName === navLink.href && "text-red-800"
          )}
        >
          {navLink.label}
        </Link>
      ))}
    </nav>
  );
};
