"use client";

import {format} from 'date-fns';
import { NavButton } from "./nav-button";
import { usePathname } from "next/navigation";

const routes = [
  {
    href: `/clients/${format(new Date(), 'yyyy')}`,
    label: "Clients",
  },
  {
    href: "/contractors",
    label: "Contractors",
  },
  {
    href: "/",
    label: "Contracts",
  },
  {
    href: "/calendar",
    label: "Calendar",
  },
];

export const Navigation = () => {
  const pathName = usePathname();

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route, index) => (
        <NavButton
          key={index}
          href={route.href}
          label={route.label}
          isActive={pathName === route.href}
        />
      ))}
    </div>
  );
};
