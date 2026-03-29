import React, { useEffect, useState } from 'react';

interface Asset {
  node_id: number;
  encoded: string;
  decoded: string;
  infected: boolean;
}

// 🎨 Status based on infection
const getStatus = (infected: boolean) => {
  return infected ? 'COMPROMISED' : 'ONLINE';
};

const getStatusBadge = (infected: boolean) => {
  return infected
    ? { bg: '#2d0f0f', text: '#f85149' }   // RED
    : { bg: '#0d2117', text: '#3fb950' }; // GREEN
};

// 🎯 Threat level based on infection
const getThreat = (infected: boolean) => {
  return infected ? 'CRITICAL' : 'LOW';
};

const getThreatColor = (infected: boolean) => {
  return infected ? '#f85149' : '#3fb950';
};

export function AssetRegistry() {
  const [assets, setAssets] = useState<Asset[]>([]);

  // 🔗 Fetch real data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/nodes`)
      .then(res => res.json())
      .then(setAssets)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0d1117] rounded-lg border border-[#1c2333] overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1c2333]">
        <div className="text-[#7d8590] font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest font-medium">
          BASE64 DECODED ASSET REGISTRY
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto h-[calc(100%-48px)]">
        <table className="w-full text-[10px] font-['JetBrains_Mono']">
          
          <thead className="sticky top-0 bg-[#0d1117] border-b border-[#1c2333]">
            <tr>
              <th className="px-3 py-2 text-left text-[#7d8590] uppercase">NODE</th>
              <th className="px-3 py-2 text-left text-[#7d8590] uppercase">ENCODED ID</th>
              <th className="px-3 py-2 text-left text-[#7d8590] uppercase">DECODED ID</th>
              <th className="px-3 py-2 text-left text-[#7d8590] uppercase">STATUS</th>
              <th className="px-3 py-2 text-left text-[#7d8590] uppercase">THREAT</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset, index) => {
              const statusStyle = getStatusBadge(asset.infected);

              return (
                <tr
                  key={asset.node_id}
                  className={`border-b border-[#1c2333]/30 hover:bg-[#161b22] ${
                    index % 2 === 0 ? 'bg-[#0d1117]' : 'bg-[#0a0e16]'
                  }`}
                >
                  <td className="px-3 py-2 text-[#7d8590]">
                    Node-{asset.node_id}
                  </td>

                  <td className="px-3 py-2 text-[#484f58]">
                    {asset.encoded}
                  </td>

                  <td className="px-3 py-2 text-[#e6edf3]">
                    {asset.decoded}
                  </td>

                  <td className="px-3 py-2">
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text
                      }}
                    >
                      {getStatus(asset.infected)}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <span
                      className="font-medium"
                      style={{ color: getThreatColor(asset.infected) }}
                    >
                      {getThreat(asset.infected)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
// import React from 'react';

// interface Asset {
//   encoded: string;
//   decoded: string;
//   zone: string;
//   status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
//   threat: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
// }

// const assets: Asset[] = [
//   { encoded: 'bm9kZS0wMDE=', decoded: 'node-001', zone: 'Zone-A', status: 'ONLINE', threat: 'LOW' },
//   { encoded: 'aG9zcGl0YWw=', decoded: 'hospital-01', zone: 'Zone-B', status: 'OFFLINE', threat: 'CRITICAL' },
//   { encoded: 'YmFuay0wMw==', decoded: 'bank-03', zone: 'Zone-A', status: 'ONLINE', threat: 'LOW' },
//   { encoded: 'cG93ZXJncmlk', decoded: 'powergrid-02', zone: 'Zone-C', status: 'DEGRADED', threat: 'HIGH' },
//   { encoded: 'dGVsZWNvbQ==', decoded: 'telecom-06', zone: 'Zone-B', status: 'OFFLINE', threat: 'CRITICAL' },
//   { encoded: 'd2F0ZXI=', decoded: 'water-07', zone: 'Zone-A', status: 'ONLINE', threat: 'LOW' },
//   { encoded: 'YWlycG9ydA==', decoded: 'airport-11', zone: 'Zone-C', status: 'DEGRADED', threat: 'HIGH' },
//   { encoded: 'bWlsaXRhcnk=', decoded: 'military-10', zone: 'Zone-A', status: 'ONLINE', threat: 'MEDIUM' },
//   { encoded: 'ZGF0YWNlbnRlcg==', decoded: 'datacenter-04', zone: 'Zone-B', status: 'ONLINE', threat: 'MEDIUM' },
//   { encoded: 'ZW1lcmdlbmN5', decoded: 'emergency-08', zone: 'Zone-A', status: 'ONLINE', threat: 'LOW' },
// ];

// const getStatusBadge = (status: string) => {
//   switch (status) {
//     case 'ONLINE': 
//       return { bg: '#0d2117', text: '#3fb950' };
//     case 'OFFLINE': 
//       return { bg: '#2d0f0f', text: '#f85149' };
//     case 'DEGRADED': 
//       return { bg: '#2d1f0a', text: '#d29922' };
//     default: 
//       return { bg: '#161b22', text: '#7d8590' };
//   }
// };

// const getThreatColor = (threat: string) => {
//   switch (threat) {
//     case 'LOW': return '#3fb950';
//     case 'MEDIUM': return '#d29922';
//     case 'HIGH': return '#ff8c42';
//     case 'CRITICAL': return '#f85149';
//     default: return '#7d8590';
//   }
// };

// export function AssetRegistry() {
//   return (
//     <div className="relative w-full h-full bg-[#0d1117] rounded-lg border border-[#1c2333] overflow-hidden">
//       <div className="px-4 py-3 border-b border-[#1c2333]">
//         <div className="text-[#7d8590] font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest font-medium">
//           BASE64 DECODED ASSET REGISTRY
//         </div>
//       </div>

//       <div className="overflow-auto h-[calc(100%-48px)]">
//         <table className="w-full text-[10px] font-['JetBrains_Mono']">
//           <thead className="sticky top-0 bg-[#0d1117] border-b border-[#1c2333]">
//             <tr>
//               <th className="px-3 py-2 text-left text-[#7d8590] font-medium uppercase tracking-wider">ENCODED ID</th>
//               <th className="px-3 py-2 text-left text-[#7d8590] font-medium uppercase tracking-wider">DECODED ID</th>
//               <th className="px-3 py-2 text-left text-[#7d8590] font-medium uppercase tracking-wider">ZONE</th>
//               <th className="px-3 py-2 text-left text-[#7d8590] font-medium uppercase tracking-wider">STATUS</th>
//               <th className="px-3 py-2 text-left text-[#7d8590] font-medium uppercase tracking-wider">THREAT</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assets.map((asset, index) => {
//               const statusStyle = getStatusBadge(asset.status);
//               return (
//                 <tr 
//                   key={index}
//                   className={`border-b border-[#1c2333]/30 hover:bg-[#161b22] transition-colors ${
//                     index % 2 === 0 ? 'bg-[#0d1117]' : 'bg-[#0a0e16]'
//                   }`}
//                 >
//                   <td className="px-3 py-2.5 text-[#484f58]">{asset.encoded}</td>
//                   <td className="px-3 py-2.5 text-[#e6edf3]">{asset.decoded}</td>
//                   <td className="px-3 py-2.5 text-[#7d8590]">{asset.zone}</td>
//                   <td className="px-3 py-2.5">
//                     <span 
//                       className="px-2 py-0.5 rounded-full text-[9px] font-medium"
//                       style={{ 
//                         backgroundColor: statusStyle.bg,
//                         color: statusStyle.text
//                       }}
//                     >
//                       {asset.status}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2.5">
//                     <span 
//                       className="font-medium"
//                       style={{ color: getThreatColor(asset.threat) }}
//                     >
//                       {asset.threat}
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }