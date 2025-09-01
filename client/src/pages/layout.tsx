import { Outlet } from "react-router-dom";
import { Bell, User, Menu, X } from "lucide-react";
import { AppSidebar } from "../components/Sideber";
import { useState } from "react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <section className="w-full h-screen flex flex-row">
      {/* sidebar */}
      <div className="hidden md:flex w-[18%] flex-col border-r-2 border-gray-400 overflow-auto">
        <nav className="w-full border-b border-gray-500 py-3 px-3">
          <span className="truncate whitespace-nowrap font-semibold">
            Project Management Tool
          </span>
        </nav>
        <aside className="flex flex-1 flex-col p-1">
          <AppSidebar />
        </aside>
      </div>

      {/* Hamburger for mobile */}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className={`fixed top-0 left-0 h-full w-56 bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <aside className="w-64 bg-transparent h-full p-4 shadow-lg">
            <button className="mb-4" onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
            <AppSidebar />
          </aside>
        </div>
      )}
      {/* main*/}
      <div className="flex-1 h-full flex flex-col overflow-auto">
        <nav className="w-full border-b border-gray-500 p-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1"
            >
              <Menu />
            </button>

            <span className="truncate font-semibold">Welcome (UserName)</span>
          </div>

          <div className="flex gap-5 pr-5">
            <Bell />
            <User />
          </div>
        </nav>

        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Layout;
