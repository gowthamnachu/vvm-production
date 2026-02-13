"use client";

import { useMemo, useEffect, useState } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Position,
  Handle,
  NodeProps,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ───────────────── data ───────────────── */

const items = [
  {
    id: "1",
    num: "01",
    title: "25+ Years Legacy",
    desc: "Over two decades of trust, excellence, and proven results in holistic education",
    color: "#F4C97E",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "2",
    num: "02",
    title: "SSC Curriculum",
    desc: "Recognized by AP Govt with a structured, state-board academic framework",
    color: "#A8D8EA",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    id: "3",
    num: "03",
    title: "Green Campus",
    desc: "Lush green environment with expansive playgrounds for physical and mental well-being",
    color: "#B5D8A0",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "4",
    num: "04",
    title: "Holistic Growth",
    desc: "Equal focus on academics, sports, arts, and character building for well-rounded development",
    color: "#D4B5D8",
    icon: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
  },
];

/* ───────────────── Custom Nodes ───────────────── */

/** Central hub node at top */
function CenterNode() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#3e4e3b] to-[#2d3a2e] shadow-2xl"
        style={{ width: 180, height: 180 }}
      >
        <div className="absolute inset-2 rounded-full border border-white/10" />
        <svg
          className="w-7 h-7 text-[#e9e9e9]/80 mb-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.4}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
          />
        </svg>
        <span className="text-sm sm:text-base font-bold text-[#e9e9e9] leading-tight text-center px-5">
          Why Choose
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold text-[#e9e9e9]/50 uppercase tracking-[0.2em] mt-0.5">
          VVM
        </span>
      </div>
      {/* 4 source handles spread evenly along bottom */}
      <Handle id="s0" type="source" position={Position.Bottom} style={{ left: "20%" }} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle id="s1" type="source" position={Position.Bottom} style={{ left: "40%" }} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle id="s2" type="source" position={Position.Bottom} style={{ left: "60%" }} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle id="s3" type="source" position={Position.Bottom} style={{ left: "80%" }} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
}

/** Invisible junction node for routing straight lines */
function JunctionNode() {
  return (
    <div className="w-0 h-0">
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
}

/** Feature card node */
function FeatureNode({ data }: NodeProps) {
  const d = data as { num: string; title: string; desc: string; color: string; icon: string };
  return (
    <div className="flex flex-col items-center">
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div className="w-[170px] sm:w-[195px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Colored top bar */}
        <div className="h-1.5" style={{ backgroundColor: d.color }} />
        <div className="p-4 sm:p-5">
          {/* Number + Icon row */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-300">{d.num}</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${d.color}30` }}>
              <svg className="w-4 h-4" style={{ color: d.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d={d.icon} />
              </svg>
            </div>
          </div>
          {/* Title */}
          <h4 className="text-xs sm:text-sm font-bold text-[#2d3a2e] leading-tight mb-1.5">{d.title}</h4>
          {/* Description */}
          <p className="text-[10px] sm:text-[11px] text-gray-400 leading-relaxed">{d.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Graph layout ───────────────── */

function buildGraph(isMobile: boolean) {
  const colWidth = isMobile ? 185 : 220;
  const totalWidth = (items.length - 1) * colWidth;

  // Center node
  const centerNodeWidth = 180;
  const centerX = totalWidth / 2 - centerNodeWidth / 2;

  // Junction Y (where horizontal bar sits)
  const junctionY = 220;
  // Feature card Y
  const featureY = 260;

  const cardWidth = isMobile ? 170 : 195;

  const nodes: Node[] = [
    {
      id: "center",
      type: "centerNode",
      position: { x: centerX, y: 0 },
      data: {},
      draggable: false,
      selectable: false,
    },
  ];

  const edges: Edge[] = [];

  items.forEach((item, i) => {
    const colCenterX = i * colWidth;
    const junctionId = `junc-${item.id}`;
    const featureId = `feat-${item.id}`;

    // Junction node (invisible, for routing)
    nodes.push({
      id: junctionId,
      type: "junctionNode",
      position: { x: colCenterX + cardWidth / 2, y: junctionY },
      data: {},
      draggable: false,
      selectable: false,
    });

    // Feature card
    nodes.push({
      id: featureId,
      type: "featureNode",
      position: { x: colCenterX, y: featureY },
      data: { num: item.num, title: item.title, desc: item.desc, color: item.color, icon: item.icon },
      draggable: false,
      selectable: false,
    });

    // Center → junction (step edge = right angles)
    edges.push({
      id: `e-center-${junctionId}`,
      source: "center",
      sourceHandle: `s${i}`,
      target: junctionId,
      type: "step",
      style: { stroke: "#3e4e3b", strokeWidth: 1.5, opacity: 0.2 },
    });

    // Junction → feature (straight vertical)
    edges.push({
      id: `e-${junctionId}-${featureId}`,
      source: junctionId,
      target: featureId,
      type: "straight",
      style: { stroke: "#3e4e3b", strokeWidth: 1.5, opacity: 0.2 },
    });
  });

  return { nodes, edges };
}

const nodeTypes = {
  centerNode: CenterNode,
  junctionNode: JunctionNode,
  featureNode: FeatureNode,
};

/* ───────────────── Main component ───────────────── */

function WhyChooseFlowInner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const { nodes, edges } = useMemo(() => buildGraph(isMobile), [isMobile]);

  const flowHeight = isMobile ? 560 : 540;
  const flowWidth = isMobile ? 760 : 900;

  return (
    <div
      className="w-full mx-auto overflow-hidden"
      style={{ height: flowHeight, maxWidth: flowWidth }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        className="!bg-transparent"
      />
    </div>
  );
}

export default function WhyChooseFlow() {
  return (
    <ReactFlowProvider>
      <WhyChooseFlowInner />
    </ReactFlowProvider>
  );
}
