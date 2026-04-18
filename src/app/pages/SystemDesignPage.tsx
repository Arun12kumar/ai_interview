import React from "react";
import {
  Brain,
  Layers,
  Database,
  Server,
  Globe,
  Zap,
  Shield,
  MessageSquare,
  Cpu,
  Mic,
  FileAudio,
  Users,
  Clock,
  ArrowDown,
  ChevronRight,
  Activity,
  Cloud,
  Lock,
  BarChart2,
  RefreshCw,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { cn } from "../components/ui/utils";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface ArchNode {
  icon: React.ReactNode;
  label: string;
  sub: string;
  color: string;
}

interface ArchLayer {
  id: string;
  title: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  nodes: ArchNode[];
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const LAYERS: ArchLayer[] = [
  {
    id: "client",
    title: "Client Layer",
    bgColor: "rgba(139,110,154,0.12)",
    borderColor: "rgba(139,110,154,0.35)",
    accentColor: "#8B6E9A",
    nodes: [
      { icon: <Globe className="size-4" />, label: "React SPA", sub: "Web Application", color: "#9B8EA6" },
      { icon: <Mic className="size-4" />, label: "Audio Engine", sub: "Web Audio API", color: "#9B8EA6" },
      { icon: <Zap className="size-4" />, label: "WebSocket", sub: "Real-time Channel", color: "#9B8EA6" },
      { icon: <Layers className="size-4" />, label: "State Manager", sub: "Zustand / Context", color: "#9B8EA6" },
    ],
  },
  {
    id: "gateway",
    title: "API Gateway",
    bgColor: "rgba(91,73,104,0.12)",
    borderColor: "rgba(91,73,104,0.35)",
    accentColor: "#5B4968",
    nodes: [
      { icon: <Shield className="size-4" />, label: "Auth Middleware", sub: "JWT / OAuth 2.0", color: "#7B5F8A" },
      { icon: <RefreshCw className="size-4" />, label: "Rate Limiter", sub: "Token Bucket", color: "#7B5F8A" },
      { icon: <Server className="size-4" />, label: "Load Balancer", sub: "Round Robin", color: "#7B5F8A" },
      { icon: <Activity className="size-4" />, label: "Request Router", sub: "REST + WS Routes", color: "#7B5F8A" },
    ],
  },
  {
    id: "services",
    title: "Core Services",
    bgColor: "rgba(59,43,64,0.20)",
    borderColor: "rgba(145,126,132,0.30)",
    accentColor: "#917E84",
    nodes: [
      { icon: <Brain className="size-4" />, label: "AI Interview Service", sub: "Orchestration Layer", color: "#B39EBC" },
      { icon: <MessageSquare className="size-4" />, label: "Chat Service", sub: "History & Context", color: "#B39EBC" },
      { icon: <Users className="size-4" />, label: "User Service", sub: "Profiles & Sessions", color: "#B39EBC" },
      { icon: <BarChart2 className="size-4" />, label: "Analytics Service", sub: "Usage & Insights", color: "#B39EBC" },
    ],
  },
  {
    id: "ai",
    title: "AI Core",
    bgColor: "rgba(45,30,55,0.22)",
    borderColor: "rgba(179,158,188,0.30)",
    accentColor: "#B39EBC",
    nodes: [
      { icon: <Cpu className="size-4" />, label: "LLM Engine", sub: "GPT-4 / Claude", color: "#D5CFDA" },
      { icon: <FileAudio className="size-4" />, label: "Speech-to-Text", sub: "Whisper v3", color: "#D5CFDA" },
      { icon: <Brain className="size-4" />, label: "NLU Pipeline", sub: "Intent & Context", color: "#D5CFDA" },
      { icon: <MessageSquare className="size-4" />, label: "Response Generator", sub: "Templating + RAG", color: "#D5CFDA" },
    ],
  },
  {
    id: "data",
    title: "Data Layer",
    bgColor: "rgba(26,20,31,0.30)",
    borderColor: "rgba(213,207,218,0.20)",
    accentColor: "#D5CFDA",
    nodes: [
      { icon: <Database className="size-4" />, label: "PostgreSQL", sub: "Users, Chats, Sessions", color: "#EAE7EC" },
      { icon: <Zap className="size-4" />, label: "Redis Cache", sub: "Sessions & Hot Data", color: "#EAE7EC" },
      { icon: <Cloud className="size-4" />, label: "Object Storage", sub: "Audio & Artifacts", color: "#EAE7EC" },
      { icon: <Lock className="size-4" />, label: "Secrets Manager", sub: "API Keys & Certs", color: "#EAE7EC" },
    ],
  },
];

const TECH_STACK = [
  "React 18", "TypeScript", "Tailwind CSS", "shadcn/ui",
  "Web Audio API", "WebSocket / SSE", "Node.js", "FastAPI",
  "PostgreSQL", "Redis", "GPT-4", "Whisper v3",
  "Docker", "Kubernetes", "JWT / OAuth 2.0", "Prometheus",
];

const DATA_FLOW = [
  { step: "01", label: "User speaks", detail: "Audio captured via Web Audio API → compressed to WebM chunks" },
  { step: "02", label: "Streaming upload", detail: "Audio chunks streamed over WebSocket to API Gateway" },
  { step: "03", label: "Auth & routing", detail: "JWT validated → rate-limit checked → routed to AI Service" },
  { step: "04", label: "Transcription", detail: "Whisper v3 converts audio → text in ~300 ms" },
  { step: "05", label: "LLM inference", detail: "Transcript + conversation context → GPT-4 generates answer" },
  { step: "06", label: "Stream response", detail: "Token-by-token response streamed back via SSE / WebSocket" },
  { step: "07", label: "Persist & cache", detail: "Full exchange saved to PostgreSQL; session updated in Redis" },
];

const API_CONTRACTS = [
  { method: "WS",     route: "/chat/stream",         desc: "Bi-directional: audio chunks in, text tokens out", color: "#8B6E9A" },
  { method: "POST",   route: "/api/v1/sessions",      desc: "Create interview session, returns JWT",            color: "#7B5F8A" },
  { method: "GET",    route: "/api/v1/chats/:id",     desc: "Fetch full chat history with pagination",          color: "#6B5F7A" },
  { method: "DELETE", route: "/api/v1/chats/:id",     desc: "Permanently delete a chat session",               color: "#F24C4C" },
];

const DESIGN_PRINCIPLES = [
  { icon: <Zap className="size-4" />, title: "Golden Ratio Layout", desc: "Sidebar 261 px (161.8 × φ). Message widths: AI 55.9 %, User 38.2 %. Fibonacci spacing: 5·8·13·21·34·55 px." },
  { icon: <Layers className="size-4" />, title: "Typography Scale", desc: "Base 16 px × φ = 26 px. Scale: 10 → 13 → 16 → 21 → 26 → 34. Playfair Display headings, Inter UI text." },
  { icon: <Brain className="size-4" />, title: "Visual Hierarchy", desc: "3-level contrast: primary #FFF, secondary #EAE7EC, muted #EAE7EC/60. Depth via layered box-shadows." },
  { icon: <Activity className="size-4" />, title: "Micro-interactions", desc: "Waveform pulse with staggered delays. Button scale on press. Hover transitions at 200 ms ease-in-out." },
  { icon: <Shield className="size-4" />, title: "Accessibility", desc: "WCAG AA contrast ratios. Focus rings on all interactive elements. ARIA labels on icon-only buttons." },
  { icon: <Clock className="size-4" />, title: "Performance", desc: "CSS @keyframes over JS timers. shadcn/ui ScrollArea for virtual scroll. Memoised message renders." },
];

/* ─── Sub-components ─────────────────────────────────────────────────── */
function NodeCard({ node, accentColor }: { node: ArchNode; accentColor: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5 rounded-[13px] bg-white/[.05] border border-white/[.08] hover:bg-white/[.09] hover:border-white/[.16] transition-all cursor-default">
      <span className="shrink-0 mt-px" style={{ color: node.color }}>
        {node.icon}
      </span>
      <div>
        <p className="text-white text-[13px] font-medium leading-snug">{node.label}</p>
        <p className="text-[#EAE7EC]/50 text-[11px] mt-0.5 leading-snug">{node.sub}</p>
      </div>
    </div>
  );
}

function LayerBlock({ layer, isLast }: { layer: ArchLayer; isLast: boolean }) {
  return (
    <div>
      <div
        className="rounded-[21px] p-5 md:p-6 lg:p-8 border"
        style={{
          background: layer.bgColor,
          borderColor: layer.borderColor,
          boxShadow: `0 0 40px ${layer.accentColor}18`,
        }}
      >
        {/* Layer header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-[3px] h-[18px] rounded-full shrink-0" style={{ backgroundColor: layer.accentColor }} />
          <span
            className="text-[11px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: layer.accentColor }}
          >
            {layer.title}
          </span>
        </div>
        {/* Node grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {layer.nodes.map((n) => (
            <NodeCard key={n.label} node={n} accentColor={layer.accentColor} />
          ))}
        </div>
      </div>

      {!isLast && (
        <div className="flex justify-center py-1">
          <div className="flex flex-col items-center">
            <div className="w-px h-4 bg-white/20" />
            <ArrowDown className="size-3.5 text-white/30" />
          </div>
        </div>
      )}
    </div>
  );
}

function FlowStep({ step, isLast }: { step: (typeof DATA_FLOW)[number]; isLast: boolean }) {
  return (
    <div className="flex items-start gap-3 md:gap-4">
      <div className="shrink-0 size-9 rounded-full flex items-center justify-center border border-white/20 bg-white/[.06]">
        <span className="text-[11px] font-semibold text-[#D5CFDA]">{step.step}</span>
      </div>
      <div className={cn("flex-1 pb-5", !isLast && "border-b border-white/[.06]")}>
        <p className="text-white text-sm font-medium mb-1">{step.label}</p>
        <p className="text-[#EAE7EC]/50 text-[13px] leading-relaxed">{step.detail}</p>
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────────────────── */
export function SystemDesignPage() {
  return (
      <ScrollArea className="h-full">
        <div className="max-w-[1100px] mx-1 md:mx-10 px-4 md:px-8 pt-8 md:pt-5 pb-10 md:pb-14">

          {/* ── Breadcrumb + Heading ── */}
          <div className="mb-8 md:mb-14">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Brain className="size-[18px] text-white/50" />
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/50">
                  AI Interview
                </span>
              </div>
              <ChevronRight className="size-3.5 text-white/30" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#B39EBC]">
                System Design
              </span>
            </div>

            <h1
              className="text-white mb-2 text-3xl md:text-[42px]"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 400, lineHeight: 1.2 }}
            >
              Architecture Overview
            </h1>
            <p className="text-[#EAE7EC]/60 max-w-xl text-base leading-[1.75]">
              A layered, scalable system for real-time AI-powered interview
              assistance — from audio capture to LLM response streaming.
            </p>
          </div>

          {/* ── Tabs (shadcn/ui) ── */}
          <Tabs defaultValue="arch">
            <TabsList className="mb-6 md:mb-8 h-auto p-1 gap-1 bg-white/[.06] border border-white/[.08] rounded-2xl w-full sm:w-fit flex-col sm:flex-row flex-wrap">
              {[
                { value: "arch",       label: "Architecture" },
                { value: "flow",       label: "Data Flow" },
                { value: "principles", label: "Design Principles" },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="px-5 py-2.5 sm:py-2 rounded-xl text-sm w-full sm:w-auto text-[#EAE7EC]/50 data-[state=active]:bg-white/[.14] data-[state=active]:text-white data-[state=active]:shadow-sm border-transparent data-[state=active]:border-transparent hover:text-white/80 transition-all"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ── Architecture ── */}
            <TabsContent value="arch">
              <div>
                {LAYERS.map((layer, i) => (
                  <LayerBlock key={layer.id} layer={layer} isLast={i === LAYERS.length - 1} />
                ))}

                <Separator className="mt-8 mb-8 bg-white/[.08]" />

                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">
                  Technology Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="px-3 py-1.5 rounded-lg text-[12px] font-normal bg-white/[.06] border-white/[.10] text-[#EAE7EC]/70 hover:bg-white/[.10] cursor-default transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* ── Data Flow ── */}
            <TabsContent value="flow">
              <div className="max-w-[680px] space-y-5">
                {/* Steps card */}
                <div className="rounded-[21px] p-5 md:p-8 bg-white/[.04] border border-white/[.08]">
                  <h2
                    className="text-white mb-2 text-2xl md:text-[26px]"
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
                  >
                    Voice Interaction Flow
                  </h2>
                  <p className="text-[#EAE7EC]/50 text-sm mb-8 leading-[1.7]">
                    End-to-end journey from microphone input to streamed AI response.
                  </p>

                  <div className="space-y-0">
                    {DATA_FLOW.map((step, i) => (
                      <FlowStep key={step.step} step={step} isLast={i === DATA_FLOW.length - 1} />
                    ))}
                  </div>

                  {/* Latency callout */}
                  <div className="mt-5 flex items-start gap-2.5 p-4 rounded-[13px] bg-[#B39EBC]/10 border border-[#B39EBC]/20">
                    <Clock className="size-4 text-[#B39EBC] shrink-0 mt-px" />
                    <p className="text-[#EAE7EC]/70 text-[13px] leading-relaxed">
                      <span className="text-white font-medium">Target latency: </span>
                      Speech recognition ~300 ms · LLM first token ~600 ms · Full
                      response stream ~2–4 s for complex answers.
                    </p>
                  </div>
                </div>

                {/* API contracts */}
                <div className="rounded-[21px] p-5 md:p-8 bg-white/[.04] border border-white/[.08]">
                  <h3
                    className="text-white mb-5 text-[1.125rem] md:text-lg"
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
                  >
                    Key API Contracts
                  </h3>
                  <div className="space-y-3">
                    {API_CONTRACTS.map((api) => (
                      <div
                        key={api.route}
                        className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-3 p-3 rounded-[10px] bg-white/[.04] border border-white/[.06]"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto overflow-hidden">
                          <Badge
                            className="shrink-0 rounded-md text-[10px] md:text-[11px] font-semibold font-mono px-2 py-0.5"
                            style={{
                              backgroundColor: `${api.color}22`,
                              color: api.color,
                              border: `1px solid ${api.color}44`,
                            }}
                          >
                            {api.method}
                          </Badge>
                          <code className="text-[#D5CFDA] text-[11px] sm:text-[12px] md:text-[13px] font-mono shrink-0 truncate">{api.route}</code>
                        </div>
                        <span className="text-[#EAE7EC]/45 text-[11px] md:text-xs leading-snug break-words">{api.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Design Principles ── */}
            <TabsContent value="principles">
              <div>
                {/* Principle cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                  {DESIGN_PRINCIPLES.map((p) => (
                    <div
                      key={p.title}
                      className="rounded-2xl p-5 bg-white/[.04] border border-white/[.08] hover:bg-white/[.07] transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-[#B39EBC]">{p.icon}</span>
                        <h4 className="text-white text-sm font-medium">{p.title}</h4>
                      </div>
                      <p className="text-[#EAE7EC]/55 text-[13px] leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Golden ratio visualiser */}
                <div className="rounded-[21px] p-5 md:p-8 bg-white/[.04] border border-white/[.08]">
                  <h3
                    className="text-white mb-2 text-[1.125rem] md:text-[21px]"
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}
                  >
                    Golden Ratio Application
                  </h3>
                  <p className="text-[#EAE7EC]/50 text-sm mb-8 leading-[1.7]">
                    φ = 1.618 governs layout proportions, spacing scale, and typographic rhythm throughout the UI.
                  </p>

                  {/* Layout bar */}
                  <div className="mb-5">
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-3">
                      Layout Division (sidebar : main)
                    </p>
                    <div className="flex h-14 rounded-[10px] overflow-hidden gap-0.5">
                      <div
                        className="flex items-center justify-center text-white/70 text-[13px] rounded-l-[10px]"
                        style={{ width: "21%", background: "rgba(139,110,154,.35)" }}
                      >
                        21 %
                      </div>
                      <div
                        className="flex-1 flex items-center justify-center text-white/60 text-[13px] rounded-r-[10px]"
                        style={{ background: "rgba(91,73,104,.25)" }}
                      >
                        79 % main — subdivided by φ internally
                      </div>
                    </div>
                  </div>

                  {/* Fibonacci spacing bar chart */}
                  <div className="mb-5 md:mb-8 overflow-x-auto pb-2">
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-3">
                      Fibonacci Spacing Scale
                    </p>
                    <div className="flex items-end gap-1.5 min-w-max">
                      {[5, 8, 13, 21, 34, 55, 89].map((s) => (
                        <div key={s} className="flex flex-col items-center gap-1.5">
                          <span className="text-[10px] text-white/40">{s}px</span>
                          <div
                            className="rounded bg-[#8B6E9A]/60 w-6"
                            style={{ height: Math.min(s, 89) * 0.6 }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Type scale */}
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-3">
                      Typographic Scale (× φ steps)
                    </p>
                    <div className="space-y-2">
                      {[
                        { size: 42, label: "Display — Playfair Display" },
                        { size: 26, label: "Heading — Playfair Display" },
                        { size: 21, label: "Sub-heading — Inter 500" },
                        { size: 16, label: "Body — Inter 400" },
                        { size: 13, label: "Caption — Inter 400" },
                        { size: 10, label: "Label — Inter 600 Uppercase" },
                      ].map((t) => (
                        <div key={t.size} className="flex items-baseline gap-4">
                          <span className="text-white/20 text-[11px] w-8 shrink-0 text-right font-mono">
                            {t.size}
                          </span>
                          <span
                            className="text-white/75 leading-snug"
                            style={{ fontSize: `clamp(14px, 4vw, ${t.size}px)` }}
                          >
                            {t.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
  );
}
