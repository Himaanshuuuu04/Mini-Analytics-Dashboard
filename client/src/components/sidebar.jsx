import { CircleChevronRight } from 'lucide-react';
export default function Sidebar({ className = ""}) {
  return (
    <aside
      className={`bg-white border-r border-r-neutral-300 h-full min-h-screen w-64 sticky top-0 left-0${className}`}
    >   
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-2xl font-bold text-gray-900 ">
        Journalyst
      </h3>
            <CircleChevronRight className="inline-block text-gray-500" strokeWidth={1.5} size={20}  />
        </div>
        <nav className="flex flex-col space-y-2 ">
            <span className="text-sm font-semibold text-gray-500 uppercase mb-2">Menu</span>
          <a
            href="#"
            className="flex items-center text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center  text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            Settings
          </a>
          <a
            href="#"
            className="flex items-center text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            Profile
          </a>
        </nav>
      </div>
    </aside>
  );
}