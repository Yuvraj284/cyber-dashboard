import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface HeatmapData {
  node_id: number;
  response_time: number;
  anomaly: boolean;
}

// 🎯 Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-[#161b22] border border-[#1c2333] rounded-md px-3 py-2 text-xs"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <p className="text-[#58a6ff] font-medium mb-1">
          Node {payload[0].payload.node_id}
        </p>
        <p className="text-[11px] text-[#e6edf3]">
          Response: {payload[0].value} ms
        </p>
      </div>
    );
  }
  return null;
};

export function SleeperHeatmap() {
  const [data, setData] = useState<HeatmapData[]>([]);

  // 🔗 Fetch real data
  useEffect(() => {
    fetch("http://localhost:5000/api/heatmap")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  // 🎯 Count anomalies
  const sleeperCount = data.filter(d => d.anomaly).length;

  // 📊 Convert for chart
  const chartData = data.slice(0, 50).map((item, index) => ({
    name: `N${item.node_id}`,
    response: item.response_time,
    anomaly: item.anomaly
  }));

  return (
    <div className="relative w-full h-full bg-[#0d1117] rounded-lg border border-[#1c2333] overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1c2333] flex justify-between items-center">
        <div className="text-[#7d8590] font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest font-medium">
          RESPONSE TIME ANOMALY DETECTOR
        </div>

        <div className="bg-[#21130d] text-[#f85149] px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-medium">
          {sleeperCount} SLEEPER NODES
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 h-[calc(100%-48px)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2333" />
            
            <XAxis
              dataKey="name"
              stroke="#484f58"
              tick={{ fill: '#7d8590', fontSize: 10 }}
            />
            
            <YAxis
              stroke="#484f58"
              tick={{ fill: '#7d8590', fontSize: 10 }}
              label={{ value: 'ms', angle: -90, position: 'insideLeft', fill: '#7d8590' }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend />

            {/* Main line */}
            <Line
              type="monotone"
              dataKey="response"
              stroke="#58a6ff"
              strokeWidth={2}
              dot={({ cx, cy, payload }: any) => {
                const color = payload.anomaly ? '#f85149' : '#58a6ff';
                return <circle cx={cx} cy={cy} r={3} fill={color} />;
              }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
// import React, { useMemo } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const generateData = () => {
//   const data = [];
//   const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'];
  
//   for (let i = 0; i < times.length; i++) {
//     data.push({
//       time: times[i],
//       node1: Math.random() < 0.7 ? 200 + Math.random() * 300 : 1800 + Math.random() * 800,
//       node2: Math.random() < 0.8 ? 150 + Math.random() * 350 : 2000 + Math.random() * 1000,
//       node3: Math.random() < 0.85 ? 100 + Math.random() * 400 : 2200 + Math.random() * 900,
//     });
//   }
//   return data;
// };

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-[#161b22] border border-[#1c2333] rounded-md px-3 py-2 text-xs" 
//            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
//         <p className="text-[#58a6ff] font-medium mb-1">{payload[0].payload.time}</p>
//         {payload.map((entry: any, index: number) => (
//           <p key={`${entry.dataKey}-${index}`} style={{ color: entry.color }} className="text-[11px]">
//             {entry.name}: {Math.round(entry.value)}ms
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// export function SleeperHeatmap() {
//   const data = useMemo(() => generateData(), []);

//   return (
//     <div className="relative w-full h-full bg-[#0d1117] rounded-lg border border-[#1c2333] overflow-hidden">
//       <div className="px-4 py-3 border-b border-[#1c2333] flex justify-between items-center">
//         <div className="text-[#7d8590] font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest font-medium">
//           RESPONSE TIME ANOMALY DETECTOR
//         </div>
//         <div className="bg-[#21130d] text-[#f85149] px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-medium">
//           3 SLEEPER NODES
//         </div>
//       </div>

//       <div className="p-4 h-[calc(100%-48px)]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#1c2333" />
//             <XAxis 
//               dataKey="time" 
//               stroke="#484f58" 
//               tick={{ fill: '#7d8590', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
//             />
//             <YAxis 
//               stroke="#484f58" 
//               tick={{ fill: '#7d8590', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
//               label={{ value: 'ms', angle: -90, position: 'insideLeft', fill: '#7d8590', fontSize: 10 }}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend 
//               wrapperStyle={{ 
//                 fontFamily: "'JetBrains Mono', monospace", 
//                 fontSize: '10px',
//                 color: '#7d8590'
//               }}
//             />
//             <Line 
//               key="line-node1"
//               type="monotone" 
//               dataKey="node1" 
//               stroke="#58a6ff" 
//               strokeWidth={2}
//               dot={{ fill: '#58a6ff', r: 2 }}
//               name="PowerGrid-02"
//               connectNulls
//             />
//             <Line 
//               key="line-node2"
//               type="monotone" 
//               dataKey="node2" 
//               stroke="#f85149" 
//               strokeWidth={2}
//               dot={{ fill: '#f85149', r: 2 }}
//               name="Telecom-06"
//               connectNulls
//             />
//             <Line 
//               key="line-node3"
//               type="monotone" 
//               dataKey="node3" 
//               stroke="#d29922" 
//               strokeWidth={2}
//               dot={{ fill: '#d29922', r: 2 }}
//               name="Airport-11"
//               connectNulls
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }