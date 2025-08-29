import { Outlet } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { AppSidebar } from "../components/Sideber";

const layout = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      {/* sidebar */}
      <div className="w-[18%] flex-wrap h-full border-r-2 border-gray-400 overflow-auto">
        <nav className="w-full max-h-svh border-b border-gray-500 py-3">
          <span className="truncate white-space: nowrap pl-3 font-semibold">
            Prject Management Tool
          </span>

          {/* <button>submit</button> */}
        </nav>
        <aside className="flex  flex-1 flex-col p-1">
          <AppSidebar />
        </aside>
      </div>
      {/* main
       */}
      <div className="w-[82%] h-full flex-wrap rounded-[0.5rem] overflow-auto">
        <nav className="w-full max-h-svh flex justify-between border-b border-gray-500 p-3">
          <span className="truncate font-semibold">Welcome (UserName)</span>
          <div className="flex gap-10 pr-5">
            <Bell />
            <User />
          </div>
        </nav>
        <Outlet />
      </div>
    </section>
  );
};

export default layout;
