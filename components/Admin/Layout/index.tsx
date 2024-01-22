import React from "react";
import { ChildrenNode } from "../../../interfaces/index";
import { Header } from "../Header/index";
import { Aside } from "../Aside/index";

const Layout: React.FC<ChildrenNode> = ({ children }) => {
  return (
    <div className="bg-[#1E1E30]">
      <Header />
      <main className="flex mx-4 flex-row bg-[#1E1E30]">
        <Aside />
        <div className="w-full bg-[#1E1E30]">{children}</div>
      </main>
    </div>
  );
};
export default React.memo(Layout);
