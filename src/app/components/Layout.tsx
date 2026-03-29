import React from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="w-screen h-screen bg-[#080c14] overflow-hidden font-['JetBrains_Mono'] flex flex-col">
      <Header />
      
      <div className="flex-1 p-6 overflow-auto flex flex-col">
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}