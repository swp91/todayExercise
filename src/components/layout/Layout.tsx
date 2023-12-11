import { ReactNode } from "react";
import NavigationBar from "./NavigationBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-bggray">
      <div className="max-w-3xl min-h-screen m-auto bg-white">{children}</div>
      <NavigationBar />
    </div>
  );
};

export default Layout;
