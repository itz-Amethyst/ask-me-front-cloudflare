import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex w-screen h-screen text-gray-700">
      <Navbar/>
      <Sidebar/>
      
      <div className="flex flex-col flex-grow">
        <div className="flex items-center flex-shrink-0 h-16 bg-white border-b border-gray-300 px-4">
          <div>
            <h1 className="text-sm font-bold leading-none">#ask-me</h1>
            <span className="text-xs leading-none">Your go-to for personalized NFT creation , quotes with it author image translate any context into English, can Identify the text inside an audio file</span>
          </div>
        </div>
        
        {children}
        
      </div>

    </div>
	);
};

export default DashboardLayout;
