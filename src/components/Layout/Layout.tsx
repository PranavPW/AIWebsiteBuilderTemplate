import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatSidebar from '../Chat/ChatSidebar';
import ChatToggle from '../Chat/ChatToggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Chat Components */}
      <ChatSidebar />
      <ChatToggle />
    </div>
  );
};

export default Layout;