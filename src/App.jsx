// app.jsx
import React, { useState, useEffect } from "react";
import { describeArcPath } from "./utils";


const SECTORS = [
  {
    id: "neural",
    label: "NEURAL",
    subtitle: "AI & Machine Learning",
    desc: "Smart algorithms that learn and adapt to your needs.",
    bullets: ["Pattern recognition", "Predictive analytics", "Automated decisions"],
    startAngle: 332
  },
  {
    id: "quantum",
    label: "QUANTUM",
    subtitle: "High-Speed Computing",
    desc: "Next-generation processing for complex calculations.",
    bullets: ["Parallel processing", "Data encryption", "Fast simulations"],
    startAngle: 32
  },
  {
    id: "iso",
    label: "SPATIAL",
    subtitle: "3D Mapping & Design",
    desc: "Tools for modeling and visualizing in three dimensions.",
    bullets: ["3D rendering", "CAD integration", "Measurement tools"],
    startAngle: 92
  },
  {
    id: "synth",
    label: "SYNTH",
    subtitle: "Audio & Signal Processing",
    desc: "Create and manipulate sound and signal data.",
    bullets: ["Sound design", "Signal filtering", "Real-time mixing"],
    startAngle: 152
  },
  {
    id: "vector",
    label: "MOTION",
    subtitle: "Robotics & Automation",
    desc: "Precision control for mechanical systems.",
    bullets: ["Path planning", "Motor control", "Sensor feedback"],
    startAngle: 212
  },
  {
    id: "aero",
    label: "AERO",
    subtitle: "Flight Systems",
    desc: "Control interfaces for aviation and drones.",
    bullets: ["Navigation", "Autopilot", "Telemetry"],
    startAngle: 272
  },
];

const App = () => {
  const [hovered, setHovered] = useState(null);
  const [activePanel, setActivePanel] = useState(null);

  // handles the timing for panel open/close
  // theres a small delay so it doesnt flicker when moving between things
  useEffect(() => {
    let closeTimer;
    let switchTimer;

    if (hovered) {
      // if already showing a panel and hovering something else,
      // wait a bit before switching
      if (activePanel && hovered !== activePanel) {
        switchTimer = setTimeout(() => {
          setActivePanel(hovered);
        }, 200);
      } else if (!activePanel) {
        // nothing open yet, just show it
        setActivePanel(hovered);
      }
    } else {
      // mouse left everything, close after 300ms
      closeTimer = setTimeout(() => setActivePanel(null), 300);
    }

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(switchTimer);
    };
  }, [hovered, activePanel]);

  const innerRadius = 220;
  const outerRadius = 300;
  const center = 400;

  // figure out which side the panel should be on
  const getPanelSide = (id) => {
    const leftSectors = ["vector", "aero", "synth"];
    return leftSectors.includes(id) ? "left" : "right";
  };

  const panelSide = activePanel ? getPanelSide(activePanel) : "right";

  return (
    <div className="relative w-screen min-h-screen bg-obsidian bg-grid font-nunito selection:bg-gold selection:text-obsidian">

      {/* desktop layout */}
      <div className="hidden lg:flex items-center justify-center relative w-full h-screen">

        {/* logo in the middle */}
        <div className="absolute z-50 text-center pointer-events-none">
          <h1 className="font-cinzel text-5xl text-gold tracking-[10px] uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
            NEXUS-6
          </h1>
        </div>

        {/* the big ring thing */}
        <svg viewBox="0 0 800 800" className="h-[80vh] w-[80vh] overflow-visible">

          <defs>
            {/* dark gradient for the segments - slightly brighter */}
            <linearGradient id="segment-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#252015" />
              <stop offset="20%" stopColor="#1a1610" />
              <stop offset="50%" stopColor="#12100c" />
              <stop offset="80%" stopColor="#1a1610" />
              <stop offset="100%" stopColor="#252015" />
            </linearGradient>

            {/* warmer when hovered */}
            {/* bright gold when hovered */}
            <linearGradient id="segment-gradient-active" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="20%" stopColor="#C5A028" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="80%" stopColor="#C5A028" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>

            {/* stronger glow effect */}
            <filter id="gold-glow" x="-100%" y="-100%" width="300%" height="300%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* subtle ambient glow for non-hovered state */}
            <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

          </defs>

          {SECTORS.map((item) => {
            const startAngle = item.startAngle;
            const endAngle = startAngle + 56; // leaves a gap

            // text goes in the middle of each segment
            const midAngle = (startAngle + endAngle) / 2;
            const rad = (midAngle - 90) * (Math.PI / 180);
            const textRadius = (innerRadius + outerRadius) / 2;
            const textX = center + (textRadius * Math.cos(rad));
            const textY = center + (textRadius * Math.sin(rad));

            const isActive = hovered === item.id;
            const isDimmed = hovered && !isActive;

            // where the line goes to connect to the panel
            const isLeftSide = ["vector", "aero", "synth"].includes(item.id);
            const lineEndX = isLeftSide ? 0 : 800;

            return (
              <g
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer transition-all duration-500"
                style={{ opacity: isDimmed ? 0.4 : 1 }}
              >
                {/* leader line - only shows when active */}
                {isActive && (
                  <g className="transition-all duration-300">
                    {/* little vertical tick */}
                    <line
                      x1={textX + (isLeftSide ? -15 : 15)}
                      y1={textY - 8}
                      x2={textX + (isLeftSide ? -15 : 15)}
                      y2={textY + 8}
                      stroke="#D4AF37"
                      strokeWidth="1"
                      strokeOpacity={1}
                    />
                    {/* horizontal part going to the edge */}
                    <line
                      x1={textX + (isLeftSide ? -15 : 15)}
                      y1={textY}
                      x2={lineEndX}
                      y2={textY}
                      stroke="#D4AF37"
                      strokeWidth="1"
                      strokeOpacity={1}
                    />
                  </g>
                )}

                {/* the arc segment itself */}
                <path
                  d={describeArcPath(center, center, innerRadius, outerRadius, startAngle, endAngle)}
                  fill={isActive ? "url(#segment-gradient-active)" : "url(#segment-gradient)"}
                  stroke="#D4AF37"
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeOpacity={isActive ? 1 : 0.6}
                  style={{
                    filter: isActive ? "none" : "url(#soft-glow)"
                  }}
                  className="transition-all duration-300 ease-out"
                />

                {/* product name - stays horizontal */}
                <text
                  x={textX}
                  y={textY - 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? "#050505" : "#D4AF37"}
                  className={`font-cinzel font-bold tracking-widest pointer-events-none transition-all duration-300 ${isActive ? 'text-[14px]' : 'text-[10px]'}`}
                  style={{
                    opacity: 1,
                    filter: isActive ? "none" : "drop-shadow(0 0 2px rgba(212,175,55,0.4))"
                  }}
                >
                  {item.label}
                </text>

                {/* short description underneath */}
                <text
                  x={textX}
                  y={textY + 7}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? "#050505" : "#E0E0E0"}
                  className={`font-nunito pointer-events-none transition-all duration-300 ${isActive ? 'text-[8px] font-bold' : 'text-[6px]'}`}
                  style={{ opacity: isActive ? 1 : 0.85 }}
                >
                  {item.subtitle}
                </text>
              </g>
            );
          })}
        </svg>

        {/* right side panel */}
        <div
          className={`fixed top-0 right-4 h-full w-[350px] flex items-center transition-all duration-[600ms] ease-panel z-40 ${activePanel && panelSide === "right" ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          onMouseEnter={() => setHovered(activePanel)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="relative w-full px-4">
            {/* corner bits */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold/70"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold/70"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold/70"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold/70"></div>

            <div className="bg-obsidian/95 backdrop-blur-xl border border-gold/30 p-10">
              {activePanel && panelSide === "right" && <PanelContent activePanel={activePanel} sectors={SECTORS} />}
            </div>
          </div>
        </div>

        {/* left side panel - same deal */}
        <div
          className={`fixed top-0 left-4 h-full w-[350px] flex items-center transition-all duration-[600ms] ease-panel z-40 ${activePanel && panelSide === "left" ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          onMouseEnter={() => setHovered(activePanel)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="relative w-full px-4">
            {/* corner bits */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold/70"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold/70"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold/70"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold/70"></div>

            <div className="bg-obsidian/95 backdrop-blur-xl border border-gold/30 p-10">
              {activePanel && panelSide === "left" && <PanelContent activePanel={activePanel} sectors={SECTORS} />}
            </div>
          </div>
        </div>
      </div>

      {/* mobile version - just cards stacked */}
      <div className="lg:hidden block w-full">
        {/* header */}
        <div className="w-full text-center py-8 bg-obsidian">
          <h1 className="font-cinzel text-2xl text-gold tracking-[5px] uppercase">NEXUS-6</h1>
          <p className="text-tech-gray text-xs tracking-widest mt-1">V3.0 INTERFACE</p>
        </div>

        {/* product cards */}
        <div className="w-full px-6 pb-8">
          <div className="w-full max-w-sm mx-auto space-y-4">
            {SECTORS.map(item => (
              <div
                key={item.id}
                className="relative border border-gold/20 p-5 bg-obsidian/80"
              >
                {/* corner bits */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-gold/40"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-gold/40"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-gold/40"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-gold/40"></div>

                <h3 className="text-gold font-cinzel text-sm tracking-widest uppercase">{item.label}</h3>
                <p className="text-gold/70 text-[11px] font-nunito font-light">{item.subtitle}</p>
                <p className="text-tech-gray text-xs font-nunito font-light mt-3 leading-relaxed">{item.desc}</p>

                {/* bullet points */}
                <ul className="mt-3 space-y-1">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-tech-gray/90 text-[10px] font-nunito">
                      <span className="w-1 h-1 rounded-full bg-gold/70"></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

// the popup panel content
const PanelContent = ({ activePanel, sectors }) => {
  const activeData = sectors.find(s => s.id === activePanel);

  if (!activeData) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* header stuff */}
      <div className="space-y-3 border-b border-gold/40 pb-5">
        <h2 className="text-gold font-cinzel font-bold text-2xl leading-tight tracking-wider uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
          {activeData.label}
        </h2>
        <p className="text-gold font-nunito text-base">
          {activeData.subtitle}
        </p>
      </div>

      {/* main desc */}
      <p className="text-tech-gray font-nunito text-lg leading-relaxed">
        {activeData.desc}
      </p>

      {/* system status progress indicator */}
      <div className="mt-4">
        <div className="text-xs text-gold font-semibold uppercase tracking-widest mb-2">System Status</div>
        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gold w-[75%] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div>
        </div>
      </div>

      {/* bullet list */}
      <ul className="space-y-3 pt-2">
        {activeData.bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gold mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.5)]"></span>
            <span className="text-tech-gray font-nunito text-base">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* button */}
      <button className="group relative w-full mt-6 px-8 py-4 bg-transparent border border-gold text-gold font-cinzel text-sm tracking-widest uppercase overflow-hidden transition-all hover:bg-gold hover:text-obsidian hover:scale-105 active:scale-95">
        <span className="relative z-10">INITIALIZE</span>
        {/* Button Glint Effect */}
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
      </button>
    </div>
  );
};

export default App;