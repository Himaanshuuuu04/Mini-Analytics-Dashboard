import Header from "../header";
import Button from "../button";
import { Settings, LogOut } from "lucide-react";
export default function HomeHeader({ className = "", children }) {
  return (
    <Header className={` sticky top-0 z-50 w-full ${className} `}>
      <h1 className="text-xl font-bold ">Welcome back, Himanshu</h1>
      <div className="flex space-x-2">
        <Button
          className="text-sm"
          variants="secondary"
          onClick={() => alert("Settings clicked!")}
        >
          <Settings className="mr-1 inline-block" strokeWidth={1.5} size={16} />
          Settings
        </Button>

        <Button className="text-sm" onClick={() => alert("Logout clicked!")}>
          <LogOut className="mr-1 inline-block" strokeWidth={1.5} size={16} />
          Logout
        </Button>
      </div>
    </Header>
  );
}
