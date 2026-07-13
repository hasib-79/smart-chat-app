import { useState } from "react";

import Sidebar from "../components/sidebar/Sidebar";
import ChatContainer from "../components/chat/ChatContainer";

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-h-0">

        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b flex items-center px-4">

          <button
            onClick={() =>
              setIsSidebarOpen(true)
            }
            className="text-2xl mr-4"
          >
            ☰
          </button>

          <h1 className="font-bold text-xl">
            Smart Chat
          </h1>

        </div>

        <ChatContainer />
      </div>

    </div>
  );
}

export default HomePage;