import { ReactNode } from "react";

import { Header } from "@/components/header";

const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default DashBoardLayout;
