import React, { useState, useEffect } from 'react';

interface Node {
  node_id: number;
  http_status: number;
  json_status: string;
  response_time: number;
  alert: boolean;
  anomaly: boolean;
  infected: boolean;
}

export function ForensicCityMap() {
  console.log("MAP COMPONENT LOADED"); 
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // ✅ Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/api/nodes")
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data);
        setNodes(data);
      })
      .catch(err => console.error(err));
  }, []);

  // ✅ Position
  const getPosition = (index: number) => ({
    x: 50 + (index % 10) * 60,
    y: 50 + Math.floor(index / 10) * 60,
  });

  // ✅ Color logic
  const getNodeColor = (node: Node): string => {
    if (node.alert || node.infected) return '#f85149';
    if (node.http_status !== 200) return '#d29922';
    return '#3fb950';
  };

  // ✅ FIXED hover function
  const handleNodeHover = (
    index: number,
    e: React.MouseEvent<SVGCircleElement>
  ) => {
    setHoveredIndex(index);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + 20, y: rect.top - 60 });
  };

  return (
    <div className="relative w-full h-[500px] bg-[#0d1117] rounded-lg border border-[#1c2333] overflow-hidden">

      {/* DEBUG */}
      {nodes.length === 0 && (
        <div style={{ color: "red", padding: "10px" }}>
          NO DATA RECEIVED
        </div>
      )}

      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1c2333]">
        <div className="text-[#7d8590] text-[10px] uppercase">
          FORENSIC CITY MAP
        </div>
      </div>

      {/* SVG */}
      <svg width="100%" height="450" viewBox="0 0 700 500">

        <text x="20" y="30" fill="white">
          Nodes: {nodes.length}
        </text>

        {nodes.map((node, index) => {
          const { x, y } = getPosition(index);
          const color = getNodeColor(node);

          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill={color}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => handleNodeHover(index, e)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                fill="#aaa"
                fontSize="10"
              >
                {index}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && nodes[hoveredIndex] && (
        <div
          className="fixed bg-[#161b22] border border-[#1c2333] px-3 py-2 text-xs"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div>Node-{hoveredIndex}</div>
          <div>HTTP: {nodes[hoveredIndex].http_status}</div>
          <div>Response: {nodes[hoveredIndex].response_time} ms</div>
          <div>
            {nodes[hoveredIndex].alert ? "⚠️ ATTACK" : "SAFE"}
          </div>
        </div>
      )}
    </div>
  );
}