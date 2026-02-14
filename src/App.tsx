import { useState, useEffect, useRef } from "react";

// --- Season System ---
const SEASONS = {
  spring: {
    name: "Spring",
    icon: "🌸",
    months: [2, 3, 4],
    bg: "from-[#1a0f1e] via-[#1e1025] to-[#16091a]",
    accent: "#f472b6",
    stem: "#4ade80",
    leaves: ["#4ade80", "#22c55e", "#86efac"],
    flower: "#f472b6",
    flowerAlt: "#e879f9",
    sparkline: "#f472b6",
    potDeco: "🌸",
    particle: "🌸",
    particleCount: 20,
    msgs: [
      "Fresh start! Plant a commit seed.",
      "Spring sprout! Keep going.",
      "Growing in the warm breeze.",
      "Your garden is flourishing!",
      "A lush spring canopy!",
      "Full bloom — absolutely gorgeous.",
    ],
  },
  summer: {
    name: "Summer",
    icon: "☀️",
    months: [5, 6, 7],
    bg: "from-[#0a1628] via-[#0f1e30] to-[#081420]",
    accent: "#38bdf8",
    stem: "#22c55e",
    leaves: ["#16a34a", "#22c55e", "#4ade80"],
    flower: "#f472b6",
    flowerAlt: "#fb923c",
    sparkline: "#38bdf8",
    potDeco: "🐚",
    particle: "✨",
    particleCount: 15,
    msgs: [
      "Sunny days — plant a commit!",
      "A summer sprout rises.",
      "Growing strong in the heat.",
      "Your garden soaks up the sun!",
      "Long days, great code.",
      "Full bloom under summer skies!",
    ],
  },
  fall: {
    name: "Fall",
    icon: "🍂",
    months: [8, 9, 10],
    bg: "from-[#1a1008] via-[#1e150a] to-[#140e06]",
    accent: "#fb923c",
    stem: "#a3e635",
    leaves: ["#ca8a04", "#eab308", "#f59e0b"],
    flower: "#fb923c",
    flowerAlt: "#ef4444",
    sparkline: "#fb923c",
    potDeco: "🎃",
    particle: "🍁",
    particleCount: 18,
    msgs: [
      "Harvest season — plant a seed!",
      "An autumn sprout appears.",
      "Growing among falling leaves.",
      "Your garden glows golden!",
      "A warm amber canopy.",
      "Full bloom in autumn splendor!",
    ],
  },
  winter: {
    name: "Winter",
    icon: "❄️",
    months: [11, 0, 1],
    bg: "from-[#0c1220] via-[#111827] to-[#0a0f1a]",
    accent: "#93c5fd",
    stem: "#86efac",
    leaves: ["#6ee7b7", "#34d399", "#a7f3d0"],
    flower: "#93c5fd",
    flowerAlt: "#c4b5fd",
    sparkline: "#93c5fd",
    potDeco: "⛄",
    particle: "❄️",
    particleCount: 22,
    msgs: [
      "Cold outside — warm up with a commit!",
      "A frosty sprout pushes through.",
      "Growing despite the chill.",
      "Your garden braves the winter!",
      "Hardy and evergreen.",
      "Full bloom in the snow — magical!",
    ],
  },
};

type SeasonKey = keyof typeof SEASONS;

function getSeason(): SeasonKey {
  const month = new Date().getMonth();
  for (const [key, s] of Object.entries(SEASONS)) {
    if (s.months.includes(month)) return key as SeasonKey;
  }
  return "spring";
}

const STAGE_NAMES = ["Seed", "Sprout", "Seedling", "Growing", "Leafy", "Bloom"];

// --- Weather Particles ---
function WeatherParticles({ season }: { season: typeof SEASONS[SeasonKey] }) {
  const particles = Array.from({ length: season.particleCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 10 + Math.random() * 10,
    sway: (Math.random() - 0.5) * 40,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-weather-fall"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--sway" as string]: `${p.sway}px`,
          }}
        >
          {season.particle}
        </span>
      ))}
    </div>
  );
}

// --- Plant SVG ---
function PlantSVG({ stage, season }: { stage: number; season: typeof SEASONS[SeasonKey] }) {
  const s = Math.min(stage, 5);
  return (
    <svg viewBox="0 0 200 300" className="w-64 h-80 mx-auto" style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.2))" }}>
      {/* Pot */}
      <path d="M60 240 L80 280 L120 280 L140 240 Z" fill="#C4956A" stroke="#A0724E" strokeWidth="2" />
      <ellipse cx="100" cy="240" rx="42" ry="8" fill="#D4A574" />
      <ellipse cx="100" cy="242" rx="36" ry="6" fill="#5D4037" />
      {/* Pot decoration */}
      <text x="100" y="268" textAnchor="middle" fontSize="14">{season.potDeco}</text>

      {/* Seed */}
      {s === 0 && (
        <ellipse cx="100" cy="236" rx="6" ry="4" fill="#8B6914">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </ellipse>
      )}

      {/* Stem */}
      {s >= 1 && (
        <path
          d={s === 1 ? "M100 238 Q100 220 100 210" :
             s === 2 ? "M100 238 Q100 200 100 180" :
             s === 3 ? "M100 238 Q98 190 100 150" :
             s === 4 ? "M100 238 Q98 180 100 120" :
             "M100 238 Q98 170 100 100"}
          stroke={season.stem} strokeWidth={s <= 2 ? 3 : s <= 4 ? 4 : 5}
          fill="none" strokeLinecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.5s" fill="freeze" />
          <animate attributeName="stroke-dasharray" from="0 200" to="200 0" dur="1.5s" fill="freeze" />
        </path>
      )}

      {/* Lower leaves */}
      {s >= 2 && (
        <g>
          <path d="M100 200 Q115 190 120 195 Q115 205 100 200" fill={season.leaves[0]}>
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.5s" fill="freeze" />
          </path>
          <path d="M100 195 Q85 185 80 190 Q85 200 100 195" fill={season.leaves[1]}>
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.7s" fill="freeze" />
          </path>
        </g>
      )}

      {/* Mid leaves */}
      {s >= 3 && (
        <g>
          <path d="M100 170 Q120 155 128 162 Q118 175 100 170" fill={season.leaves[0]}>
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.8s" fill="freeze" />
          </path>
          <path d="M100 165 Q80 150 72 158 Q82 170 100 165" fill={season.leaves[1]}>
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1s" fill="freeze" />
          </path>
        </g>
      )}

      {/* Upper leaves */}
      {s >= 4 && (
        <g>
          <path d="M100 140 Q125 118 135 128 Q122 145 100 140" fill={season.leaves[2]}>
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1s" fill="freeze" />
          </path>
          <path d="M100 135 Q75 113 65 123 Q78 140 100 135" fill={season.leaves[0]}>
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1.2s" fill="freeze" />
          </path>
          <path d="M100 125 Q112 105 105 95 Q95 108 100 125" fill={season.leaves[1]}>
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1.4s" fill="freeze" />
          </path>
        </g>
      )}

      {/* Flowers */}
      {s >= 5 && (
        <g>
          <g>
            <circle cx="130" cy="120" r="8" fill={season.flower} opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.5s" fill="freeze" />
              <animate attributeName="r" from="4" to="8" dur="0.6s" begin="1.5s" fill="freeze" />
            </circle>
            <circle cx="130" cy="120" r="3" fill="#FFC107" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="1.8s" fill="freeze" />
            </circle>
          </g>
          <g>
            <circle cx="72" cy="115" r="7" fill={season.flowerAlt} opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.7s" fill="freeze" />
              <animate attributeName="r" from="3" to="7" dur="0.6s" begin="1.7s" fill="freeze" />
            </circle>
            <circle cx="72" cy="115" r="2.5" fill="#FFC107" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2s" fill="freeze" />
            </circle>
          </g>
          <g>
            <circle cx="105" cy="90" r="9" fill={season.flower} opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.9s" fill="freeze" />
              <animate attributeName="r" from="4" to="9" dur="0.6s" begin="1.9s" fill="freeze" />
            </circle>
            <circle cx="105" cy="90" r="3.5" fill="#FFD54F" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.2s" fill="freeze" />
            </circle>
          </g>
          {/* Sparkle particles */}
          <circle cx="145" cy="105" r="2" fill={season.accent} opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="58" cy="100" r="1.5" fill={season.accent} opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="115" cy="78" r="1.5" fill={season.accent} opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="3s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  );
}

// --- Sparkline ---
function Sparkline({ data, color }: { data: { date: string; count: number }[]; color: string }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.count), 1);
  const w = 280;
  const h = 60;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.count / max) * (h - 10) - 5;
    return `${x},${y}`;
  }).join(" ");
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="w-full max-w-xs mx-auto mt-6">
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full">
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * w;
          return (
            <text key={i} x={x} y={h + 16} textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="monospace">
              {days[new Date(d.date + "T12:00:00").getDay()]}
            </text>
          );
        })}
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - (d.count / max) * (h - 10) - 5;
          return <circle key={i} cx={x} cy={y} r="4" fill={d.count > 0 ? color : "#374151"} stroke="#1F2937" strokeWidth="1.5" />;
        })}
      </svg>
    </div>
  );
}

// --- Data Fetching ---
function fetchGarden(username: string) {
  return fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
    .then((r) => {
      if (!r.ok) throw new Error("User not found");
      return r.json();
    })
    .then((raw) => {
      const contribs = raw.contributions;
      const today = new Date().toISOString().split("T")[0];
      const todayEntry = contribs.find((d: any) => d.date === today);
      const todayCount = todayEntry?.count ?? 0;

      let streak = 0;
      const now = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const ds = d.toISOString().split("T")[0];
        const e = contribs.find((x: any) => x.date === ds);
        if (e && e.count > 0) streak++;
        else if (i === 0) continue;
        else break;
      }

      let stage = 0;
      if (todayCount === 0) stage = 0;
      else if (todayCount <= 2) stage = 1;
      else if (todayCount <= 5) stage = 2;
      else if (todayCount <= 10) stage = 3;
      else if (todayCount <= 20) stage = 4;
      else stage = 5;

      if (streak >= 30) stage = Math.max(stage, 4);
      else if (streak >= 14) stage = Math.max(stage, 3);
      else if (streak >= 7) stage = Math.max(stage, 2);

      const recent = contribs
        .filter((d: any) => {
          const diff = (now.getTime() - new Date(d.date).getTime()) / 86400000;
          return diff >= 0 && diff < 7;
        })
        .sort((a: any, b: any) => a.date.localeCompare(b.date))
        .map((d: any) => ({ date: d.date, count: d.count }));

      return { username, today: todayCount, streak, stage, totalLastYear: raw.total.lastYear, recent };
    });
}

// --- Main App ---
export default function App() {
  const params = new URLSearchParams(window.location.search);
  const initialUser = params.get("user") || "";

  const [input, setInput] = useState(initialUser);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const seasonKey = getSeason();
  const season = SEASONS[seasonKey];

  const loadUser = (username: string) => {
    setLoading(true);
    setError(null);
    fetchGarden(username)
      .then((d) => {
        setData(d);
        setLoading(false);
        const url = new URL(window.location.href);
        url.searchParams.set("user", username);
        window.history.replaceState({}, "", url.toString());
      })
      .catch(() => {
        setError("Couldn't find that user. Check the username?");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (initialUser) loadUser(initialUser);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) loadUser(trimmed);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${season.bg} flex flex-col items-center justify-center px-4 py-12 font-sans relative`}>
      <WeatherParticles season={season} />

      {/* Season indicator */}
      <div className="fixed top-4 right-4 z-10">
        <div
          className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5 flex items-center gap-1.5"
          style={{ color: season.accent }}
        >
          <span className="text-sm">{season.icon}</span>
          <span className="text-xs font-medium">{season.name}</span>
        </div>
      </div>

      <div className="max-w-sm w-full relative z-10">
        {!data && !loading && !error && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">commit garden</h1>
            <p className="text-gray-400 text-sm">watch your GitHub contributions grow into a plant</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6 justify-center">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">@</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="github username"
              className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-lg pl-7 pr-3 py-2 text-white text-sm w-48 focus:outline-none focus:ring-1 placeholder-gray-600 transition-colors"
              style={{ borderColor: `${season.accent}20`, ["--tw-ring-color" as string]: `${season.accent}40` }}
            />
          </div>
          <button
            type="submit"
            className="text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
            style={{ backgroundColor: `${season.accent}cc` }}
          >
            Grow
          </button>
        </form>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 animate-pulse text-lg">Growing your garden...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-400 text-sm">{error}</div>
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="text-center mb-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {data.username}
                <span className="text-gray-500 font-normal text-lg">&apos;s garden</span>
              </h1>
            </div>

            <div className="my-6">
              <PlantSVG stage={data.stage} season={season} />
            </div>

            <div className="text-center mb-8">
              <div
                className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                style={{ backgroundColor: `${season.accent}22`, color: season.accent }}
              >
                {STAGE_NAMES[data.stage]}
              </div>
              <p className="text-gray-400 text-sm">{season.msgs[data.stage]}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { val: data.today, label: "today" },
                { val: data.streak, label: "day streak" },
                { val: data.totalLastYear.toLocaleString(), label: "this year" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="backdrop-blur-xl bg-white/[0.04] rounded-xl p-3 text-center border border-white/[0.08]"
                >
                  <div className="text-2xl font-bold text-white">{stat.val}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="backdrop-blur-xl bg-white/[0.04] rounded-xl p-4 border border-white/[0.08]">
              <div className="text-xs text-gray-500 mb-1 text-center">Last 7 days</div>
              <Sparkline data={data.recent} color={season.sparkline} />
            </div>
          </>
        )}

        <div className="text-center mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-gray-500 text-xs">
            made with <span className="text-red-400">&#9829;</span> by{" "}
            <a href="https://github.com/AndreaGriffiths11" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Andrea Griffiths
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
