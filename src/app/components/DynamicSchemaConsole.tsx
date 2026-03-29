import React, { useEffect, useState } from 'react';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'normal' | 'warning' | 'rotation';
}

export function DynamicSchemaConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [schema, setSchema] = useState<{ version: number; active_column: string } | null>(null);

  // ⏱️ Get current time
  const getTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 8);
  };

  useEffect(() => {
    let prevVersion: number | null = null;

    const fetchSchema = () => {
      fetch("http://localhost:5000/api/schema")
        .then(res => res.json())
        .then(data => {
          setSchema(data);

          const timestamp = getTime();

          // 🔄 Detect rotation
          if (prevVersion !== null && prevVersion !== data.version) {
            const rotationLogs: LogEntry[] = [
              {
                timestamp,
                message: `⚠ ROTATION DETECTED - switching to v${data.version}`,
                type: 'rotation'
              },
              {
                timestamp,
                message: `Schema v${data.version} ACTIVE - key: ${data.active_column}`,
                type: 'warning'
              }
            ];

            setLogs(prev => [...prev, ...rotationLogs].slice(-15));
          } else {
            // Initial load
            setLogs(prev => [
              ...prev,
              {
                timestamp,
                message: `Schema v${data.version} ACTIVE - key: ${data.active_column}`,
                type: 'normal' as const
              }
            ].slice(-15));
          }

          prevVersion = data.version;
        })
        .catch(err => console.error(err));
    };

    // Initial fetch
    fetchSchema();

    // 🔁 Poll every 5 seconds
    const interval = setInterval(fetchSchema, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0d1117] rounded-lg border border-[#1c2333] overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1c2333] flex justify-between items-center">
        <div className="text-[#7d8590] font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest font-medium">
          SCHEMA VERSION MONITOR
        </div>

        <div className="bg-[#161b22] border border-[#1c2333] text-[#58a6ff] px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono']">
          {schema ? `schema_v${schema.version}` : 'loading...'}
        </div>
      </div>

      {/* Console */}
      <div className="p-4 h-[calc(100%-48px)] overflow-auto bg-[#090d14]">
        <div className="font-['JetBrains_Mono'] text-[11px] leading-relaxed">
          
          {logs.map((log, index) => (
            <div
              key={index}
              className={`mb-1 ${
                log.type === 'rotation' ? 'text-[#d29922]' :
                log.type === 'warning' ? 'text-[#3fb950]' :
                'text-[#7d8590]'
              }`}
            >
              <span className="text-[#484f58]">[{log.timestamp}]</span> {log.message}
            </div>
          ))}

          {/* Cursor */}
          <div className="flex items-center mt-2">
            <span className="text-[#484f58]">[{getTime()}]</span>
            <span className="ml-1 text-[#7d8590]">_</span>
          </div>

        </div>
      </div>
    </div>
  );
}
// import React, { useEffect, useState } from 'react';

// interface LogEntry {
//   timestamp: string;
//   message: string;
//   type: 'normal' | 'warning' | 'rotation';
// }

// const initialLogs: LogEntry[] = [
//   { timestamp: '09:45:12', message: 'System initialized - AEGIS Defense v3.2.1', type: 'normal' },
//   { timestamp: '09:45:15', message: 'Schema v1 ACTIVE - key: node_id', type: 'normal' },
//   { timestamp: '09:55:03', message: '⚠ ROTATION DETECTED - switching to v2', type: 'rotation' },
//   { timestamp: '09:55:03', message: 'Schema v2 ACTIVE - key: device_id', type: 'warning' },
//   { timestamp: '10:05:47', message: 'Encrypted handshake completed', type: 'normal' },
//   { timestamp: '10:10:22', message: '⚠ ROTATION DETECTED - switching to v3', type: 'rotation' },
//   { timestamp: '10:10:22', message: 'Schema v3 ACTIVE - key: asset_uuid', type: 'warning' },
//   { timestamp: '10:15:38', message: 'Deep packet inspection engaged', type: 'normal' },
//   { timestamp: '10:20:19', message: '⚠ ROTATION DETECTED - switching to v1', type: 'rotation' },
//   { timestamp: '10:20:19', message: 'Schema v1 ACTIVE - key: node_id', type: 'warning' },
//   { timestamp: '10:25:44', message: 'Anomaly scan complete - 3 threats detected', type: 'normal' },
//   { timestamp: '10:30:07', message: '⚠ ROTATION DETECTED - switching to v2', type: 'rotation' },
//   { timestamp: '10:30:07', message: 'Schema v2 ACTIVE - key: device_id', type: 'warning' },
// ];

// export function DynamicSchemaConsole() {
//   const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

//   useEffect(() => {
//     // Add new logs periodically
//     const logInterval = setInterval(() => {
//       const schemas = ['v1', 'v2', 'v3'];
//       const keys = ['node_id', 'device_id', 'asset_uuid'];
//       const randomSchema = schemas[Math.floor(Math.random() * schemas.length)];
//       const schemaIndex = schemas.indexOf(randomSchema);
      
//       const now = new Date();
//       const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
//       const newLogs: LogEntry[] = [
//         { timestamp, message: `⚠ ROTATION DETECTED - switching to ${randomSchema}`, type: 'rotation' },
//         { timestamp, message: `Schema ${randomSchema} ACTIVE - key: ${keys[schemaIndex]}`, type: 'warning' },
//       ];

//       setLogs(prev => [...prev, ...newLogs].slice(-15)); // Keep last 15 logs
//     }, 8000);

//     return () => {
//       clearInterval(logInterval);
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-full bg-[#0d1117] rounded-lg border border-[#1c2333] overflow-hidden">
//       <div className="px-4 py-3 border-b border-[#1c2333] flex justify-between items-center">
//         <div className="text-[#7d8590] font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest font-medium">
//           SCHEMA VERSION MONITOR
//         </div>
//         <div className="bg-[#161b22] border border-[#1c2333] text-[#58a6ff] px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono']">
//           schema_v2
//         </div>
//       </div>

//       <div className="p-4 h-[calc(100%-48px)] overflow-auto bg-[#090d14]">
//         <div className="font-['JetBrains_Mono'] text-[11px] leading-relaxed">
//           {logs.map((log, index) => (
//             <div 
//               key={index}
//               className={`mb-1 ${
//                 log.type === 'rotation' ? 'text-[#d29922]' :
//                 log.type === 'warning' ? 'text-[#3fb950]' :
//                 'text-[#7d8590]'
//               }`}
//             >
//               <span className="text-[#484f58]">[{log.timestamp}]</span> {log.message}
//             </div>
//           ))}
//           <div className="flex items-center mt-2">
//             <span className="text-[#484f58]">[{new Date().toTimeString().slice(0, 8)}]</span>
//             <span className="ml-1 text-[#7d8590]">_</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }