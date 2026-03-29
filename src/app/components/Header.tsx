import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, Map, Grid3x3, Network, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function Header() {
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();
  };

  const navItems = [
    { id: 'map', path: '/map', icon: Map, label: 'FORENSIC MAP' },
    { id: 'heatmap', path: '/heatmap', icon: Grid3x3, label: 'ANOMALY DETECTOR' },
    { id: 'schema', path: '/schema', icon: Network, label: 'SCHEMA MONITOR' },
    { id: 'registry', path: '/registry', icon: Database, label: 'ASSET REGISTRY' },
  ];

  const isActive = (path: string) => {
    if (path === '/map' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  return (
    <div className="bg-[#0d1117] border-b border-[#1c2333]">
      {/* Top bar */}
      <div className="h-12 px-6 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#58a6ff]" strokeWidth={1.5} />
          <div>
            <h1 className="text-[#e6edf3] font-['IBM_Plex_Mono'] text-sm font-semibold tracking-wider">
              AEGIS DEFENSE CONSOLE
            </h1>
            <div className="text-[#7d8590] font-['JetBrains_Mono'] text-[9px] tracking-wide">
              Cyber Infrastructure Protection System
            </div>
          </div>
        </div>

        {/* Center section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#21130d]">
            <span className="text-[#f85149] font-['JetBrains_Mono'] text-xs font-medium">
              ACTIVE THREATS: 4
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[#d29922]" strokeWidth={2} />
            <span className="text-[#d29922] font-['JetBrains_Mono'] text-[10px] font-medium">
              SHADOW CONTROLLER: UNIDENTIFIED
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="text-[#58a6ff] font-['JetBrains_Mono'] text-sm font-medium tracking-wide">
              {formatTime(time)}
            </div>
            <div className="text-[#7d8590] font-['JetBrains_Mono'] text-[9px]">
              {formatDate(time)}
            </div>
          </div>
          <div className="px-2 py-0.5 rounded bg-[#21130d]">
            <span className="text-[#f85149] font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wide">
              CRITICAL
            </span>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="h-10 px-6 flex items-center gap-1 border-t border-[#1c2333]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center gap-2 px-4 py-1.5 rounded-md transition-all"
              style={{
                color: active ? '#58a6ff' : '#7d8590',
                backgroundColor: active ? 'rgba(88, 166, 255, 0.1)' : 'transparent',
                borderBottom: active ? '2px solid #58a6ff' : '2px solid transparent',
              }}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[10px] font-['IBM_Plex_Mono'] font-medium tracking-wider">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}