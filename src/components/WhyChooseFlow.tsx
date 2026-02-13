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
    title: "CBSE Curriculum",
    desc: "Affiliated to CBSE with a structured, nationally recognized academic framework",
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

/** Central hub – the main heading itself inside a large circle */
function CenterNode() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative flex flex-col items-center justify-center rounded-full border-[3px] border-[#3e4e3b]/20 bg-[#f5f2ec] shadow-xl"
        style={{ width: 220, height: 220 }}
      >
        {/* inner dashed ring */}
        <div className="absolute inset-3 rounded-full border-[1.5px] border-dashed border-[#3e4e3b]/12" />
        {/* icon */}
        <svg
          className="w-9 h-9 text-[#3e4e3b]/70 mb-2"
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
        <span className="text-base sm:text-lg font-bold text-[#3e4e3b] leading-tight text-center px-6">
          Why Choose
        </span>
        <span className="text-[11px] sm:text-xs font-semibold text-[#3e4e3b]/50 uppercase tracking-widest mt-0.5">
          Vagdevi Vidya Mandir
        </span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
}

/** Small numbered dot on the branch */
function NumberNode({ data }: NodeProps) {
  const d = data as { num: string };
  return (
    <div className="flex items-center justify-center">
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div className="w-10 h-10 rounded-full bg-white border-2 border-[#3e4e3b]/15 flex items-center justify-center shadow-sm">
        <span className="text-[11px] font-bold text-[#3e4e3b]/70">{d.num}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
}

/** Coloured pill label */
function LabelNode({ data }: NodeProps) {
  const d = data as { title: string; desc: string; color: string; icon: string };
  return (
    <div className="flex items-center">
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div
        className="relative px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl shadow-md min-w-[200px] max-w-[280px] sm:max-w-[320px]"
        style={{ backgroundColor: d.color }}
      >
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-4 h-4 text-[#3e4e3b]/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={d.icon} />
          </svg>
          <span className="text-sm sm:text-base font-bold text-[#3e4e3b] uppercase tracking-wide leading-tight">
            {d.title}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-[#3e4e3b]/55 leading-relaxed">
          {d.desc}
        </p>
      </div>
    </div>
  );
}

/* ───────────────── Graph layout ───────────────── */

function buildGraph(isMobile: boolean) {
  const centerX = isMobile ? 10 : 40;
  const centerY = isMobile ? 310 : 230;
  const numX = isMobile ? 180 : 310;
  const labelX = isMobile ? 230 : 380;
  const spacing = isMobile ? 130 : 120;
  const startY = centerY - ((items.length - 1) * spacing) / 2;

  const nodes: Node[] = [
    {
      id: "center",
      type: "centerNode",
      position: { x: centerX, y: centerY - 110 },
      data: {},
      draggable: false,
      selectable: false,
    },
  ];

  const edges: Edge[] = [];

  items.forEach((item, i) => {
    const y = startY + i * spacing;
    const numId = `num-${item.id}`;
    const labelId = `label-${item.id}`;

    nodes.push({
      id: numId,
      type: "numberNode",
      position: { x: numX, y: y - 20 },
      data: { num: item.num },
      draggable: false,
      selectable: false,
    });

    nodes.push({
      id: labelId,
      type: "labelNode",
      position: { x: labelX, y: y - 38 },
      data: { title: item.title, desc: item.desc, color: item.color, icon: item.icon },
      draggable: false,
      selectable: false,
    });

    // center → number dot (dotted line)
    edges.push({
      id: `e-center-${numId}`,
      source: "center",
      target: numId,
      type: "default",
      style: { stroke: "#3e4e3b", strokeWidth: 1.5, opacity: 0.3, strokeDasharray: "6 4" },
      animated: false,
    });

    // number dot → label pill (dotted line)
    edges.push({
      id: `e-${numId}-${labelId}`,
      source: numId,
      target: labelId,
      type: "default",
      style: { stroke: "#3e4e3b", strokeWidth: 1.5, opacity: 0.3, strokeDasharray: "6 4" },
      animated: false,
    });
  });

  return { nodes, edges };
}

const nodeTypes = {
  centerNode: CenterNode,
  numberNode: NumberNode,
  labelNode: LabelNode,
};

/* ───────────────── Main component ───────────────── */

function WhyChooseFlowInner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const { nodes, edges } = useMemo(() => buildGraph(isMobile), [isMobile]);

  const flowHeight = isMobile ? 640 : 580;
  const flowWidth = isMobile ? 500 : 780;

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
