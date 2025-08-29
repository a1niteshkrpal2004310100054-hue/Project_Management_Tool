import { Users, ListTodo, FolderKanban, ClipboardPlus } from "lucide-react";

const navItems = [
  {
    name: "Project",
    url: "#",
    icon: FolderKanban,
  },
  {
    name: "Team",
    url: "#",
    icon: Users,
  },
  {
    name: "Tasks",
    url: "#",
    icon: ListTodo,
  },
  {
    name: "Report",
    url: "#",
    icon: ClipboardPlus,
  },
];

export function AppSidebar() {
  return (
    <div className="w-full max-w-xs mx-auto space-y-2">
      {navItems.map((item, index) => (
        <div key={index}>
          <a
            href={item.url}
            className="flex items-center gap-4 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            {item.icon && <item.icon className="w-5 h-5" />}
            <span className="text-md font-medium">{item.name}</span>
          </a>
        </div>
      ))}
    </div>
  );
}
