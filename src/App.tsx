import { useState, useEffect, useRef } from "react";

const STAGES = [
  { name: "Seed", color: "#8B6914", msg: "Plant a seed today — make your first commit!" },
  { name: "Sprout", color: "#7CB342", msg: "A tiny sprout! Keep going." },
  { name: "Seedling", color: "#66BB6A", msg: "Growing nicely. Building momentum." },
  { name: "Growing", color: "#43A047", msg: "Strong and steady. Your garden thrives!" },
  { name: "Leafy", color: "#2E7D32", msg: "Look at that canopy! You're on fire." },
  { name: "Bloom", color: "#E91E63", msg: "Full bloom! Absolutely magnificent." },
];

function PlantSVG({ stage }: { stage: number }) {
  const s = Math.min(stage, 5);
  return (
    <svg viewBox="0 0 200 300" className="w-64 h-80 mx-auto" style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.15))" }}>
      <path d="M60 240 L80 280 L120 280 L140 240 Z" fill="#C4956A" stroke="#A0724E" strokeWidth="2" />
      <ellipse cx="100" cy="240" rx="42" ry="8" fill="#D4A574" />
      <ellipse cx="100" cy="242" rx="36" ry="6" fill="#5D4037" />
      {s === 0 && (
        <g>
          <ellipse cx="100" cy="236" rx="6" ry="4" fill="#8B6914">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
          </ellipse>
        </g>
      )}
      {s >= 1 && (
        <g>
          <path
            d={s === 1 ? "M100 238 Q100 220 100 210" :
               s === 2 ? "M100 238 Q100 200 100 180" :
               s === 3 ? "M100 238 Q98 190 100 150" :
               s === 4 ? "M100 238 Q98 180 100 120" :
               "M100 238 Q98 170 100 100"}
            stroke="#4CAF50" strokeWidth={s <= 2 ? 3 : s <= 4 ? 4 : 5}
            fill="none" strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.5s" fill="freeze" />
            <animate attributeName="stroke-dasharray" from="0 200" to="200 0" dur="1.5s" fill="freeze" />
          </path>
        </g>
      )}
      {s >= 2 && (
        <g>
          <path d="M100 200 Q115 190 120 195 Q115 205 100 200" fill="#66BB6A">
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.5s" fill="freeze" />
          </path>
          <path d="M100 195 Q85 185 80 190 Q85 200 100 195" fill="#81C784">
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.7s" fill="freeze" />
          </path>
        </g>
      )}
      {s >= 3 && (
        <g>
          <path d="M100 170 Q120 155 128 162 Q118 175 100 170" fill="#4CAF50">
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.8s" fill="freeze" />
          </path>
          <path d="M100 165 Q80 150 72 158 Q82 170 100 165" fill="#66BB6A">
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1s" fill="freeze" />
          </path>
        </g>
      )}
      {s >= 4 && (
        <g>
          <path d="M100 140 Q125 118 135 128 Q122 145 100 140" fill="#388E3C">
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1s" fill="freeze" />
          </path>
          <path d="M100 135 Q75 113 65 123 Q78 140 100 135" fill="#43A047">
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1.2s" fill="freeze" />
          </path>
          <path d="M100 125 Q112 105 105 95 Q95 108 100 125" fill="#2E7D32">
            <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1.4s" fill="freeze" />
          </path>
        </g>
      )}
      {s >= 5 && (
        <g>
          <g>
            <circle cx="130" cy="120" r="8" fill="#E91E63" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.5s" fill="freeze" />
              <animate attributeName="r" from="4" to="8" dur="0.6s" begin="1.5s" fill="freeze" />
            </circle>
            <circle cx="130" cy="120" r="3" fill="#FFC107" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="1.8s" fill="freeze" />
            </circle>
          </g>
          <g>
            <circle cx="72" cy="115" r="7" fill="#CE93D8" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.7s" fill="freeze" />
              <animate attributeName="r" from="3" to="7" dur="0.6s" begin="1.7s" fill="freeze" />
            </circle>
            <circle cx="72" cy="115" r="2.5" fill="#FFC107" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2s" fill="freeze" />
            </circle>
          </g>
          <g>
            <circle cx="105" cy="90" r="9" fill="#F48FB1" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.9s" fill="freeze" />
              <animate attributeName="r" from="4" to="9" dur="0.6s" begin="1.9s" fill="freeze" />
            </circle>
            <circle cx="105" cy="90" r="3.5" fill="#FFD54F" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.2s" fill="freeze" />
            </circle>
          </g>
          <circle cx="145" cy="105" r="2" fill="#FFF9C4" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="58" cy="100" r="1.5" fill="#FFF9C4" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="115" cy="78" r="1.5" fill="#FFF9C4" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="3s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  );
}

function Sparkline({ data }: { data: { date: string; count: number }[] }) {
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
        <polyline points={points} fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - (d.count / max) * (h - 10) - 5;
          return <circle key={i} cx={x} cy={y} r="4" fill={d.count > 0 ? "#4CAF50" : "#374151"} stroke="#1F2937" strokeWidth="1.5" />;
        })}
      </svg>
    </div>
  );
}

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

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const initialUser = params.get("user") || "";

  const [input, setInput] = useState(initialUser);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-sm w-full">
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
              className="bg-gray-800/60 border border-gray-700/60 rounded-lg pl-7 pr-3 py-2 text-white text-sm w-48 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30 placeholder-gray-600 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600/80 hover:bg-green-500/80 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
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
                <span className="text-gray-500 font-normal text-lg">'s garden</span>
              </h1>
            </div>

            <div className="my-6">
              <PlantSVG stage={data.stage} />
            </div>

            <div className="text-center mb-8">
              <div
                className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                style={{ backgroundColor: STAGES[data.stage].color + "22", color: STAGES[data.stage].color }}
              >
                {STAGES[data.stage].name}
              </div>
              <p className="text-gray-400 text-sm">{STAGES[data.stage].msg}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700/50">
                <div className="text-2xl font-bold text-white">{data.today}</div>
                <div className="text-xs text-gray-500 mt-1">today</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700/50">
                <div className="text-2xl font-bold text-white">{data.streak}</div>
                <div className="text-xs text-gray-500 mt-1">day streak</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700/50">
                <div className="text-2xl font-bold text-white">{data.totalLastYear.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">this year</div>
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
              <div className="text-xs text-gray-500 mb-1 text-center">Last 7 days</div>
              <Sparkline data={data.recent} />
            </div>
          </>
        )}

        <div className="text-center mt-8 pt-6 border-t border-gray-800/50">
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
