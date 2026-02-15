import { useState, useEffect, useRef } from "react";

const STAGES = [
  { name: "Seed", color: "#8B6914", msg: "Plant a seed today — make your first commit!" },
  { name: "Sprout", color: "#7CB342", msg: "A tiny sprout! Keep going." },
  { name: "Seedling", color: "#66BB6A", msg: "Growing nicely. Building momentum." },
  { name: "Growing", color: "#43A047", msg: "Strong and steady. Your garden thrives!" },
  { name: "Leafy", color: "#2E7D32", msg: "Look at that canopy! You're on fire." },
  { name: "Bloom", color: "#FFD700", msg: "Full bloom! Absolutely magnificent." },
];

const ENCOURAGEMENT = [
  "Every code whisperer starts somewhere 🌱",
  "Your future self will thank you!",
  "One commit at a time 🌟",
  "The best time to plant was yesterday. The second best is today!",
  "Your garden is waiting for you!",
  "Code today, bloom tomorrow ✨",
  "Small steps lead to big trees 🌳",
  "Today's commit is tomorrow's forest 🌲",
];

function PlantSVG({ stage, animate = true }: { stage: number; animate?: boolean }) {
  const s = Math.min(stage, 5);
  
  return (
    <svg 
      viewBox="0 0 200 320" 
      className={`w-72 h-96 mx-auto transition-transform duration-300 ${animate ? 'hover:scale-105 cursor-pointer' : ''}`}
      style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))" }}
    >
      <defs>
        <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="50%" stopColor="#C4956A" />
          <stop offset="100%" stopColor="#A0724E" />
        </linearGradient>
        <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>
      </defs>
      
      <ellipse cx="100" cy="305" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
      <path d="M55 250 L70 300 L130 300 L145 250 Z" fill="url(#potGrad)" stroke="#8B5A2B" strokeWidth="2" />
      <ellipse cx="100" cy="250" rx="45" ry="10" fill="#C4956A" />
      <ellipse cx="100" cy="252" rx="38" ry="7" fill="url(#soilGrad)" />
      <circle cx="80" cy="255" r="3" fill="#4E342E" opacity="0.6" />
      <circle cx="110" cy="253" r="2" fill="#4E342E" opacity="0.5" />
      <circle cx="95" cy="258" r="2.5" fill="#4E342E" opacity="0.4" />

      {s === 0 && (
        <g className="animate-bounce-slow">
          <ellipse cx="100" cy="245" rx="8" ry="5" fill="#8B6914">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          </ellipse>
        </g>
      )}

      {s >= 1 && (
        <g>
          <path
            d={s === 1 ? "M100 250 Q100 235 100 225" : "M100 250 Q100 220 100 200"}
            stroke="#6B8E23"
            strokeWidth={s === 1 ? 3 : 4}
            fill="none"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" />
          </path>
        </g>
      )}

      {s >= 2 && (
        <g className="animate-sway">
          <path d="M100 225 Q115 215 125 220 Q115 230 100 225" fill="#7CB342" />
          <path d="M100 220 Q85 210 75 215 Q85 225 100 220" fill="#8BC34A" />
        </g>
      )}

      {s >= 3 && (
        <g className="animate-sway">
          <path d="M100 200 Q120 185 135 195 Q120 210 100 200" fill="#4CAF50" />
          <path d="M100 195 Q80 180 65 190 Q80 205 100 195" fill="#66BB6A" />
          <path d="M100 185 Q110 170 100 155 Q90 170 100 185" fill="#43A047" />
        </g>
      )}

      {s >= 4 && (
        <g className="animate-sway">
          <path d="M100 170 Q130 150 145 165 Q125 180 100 170" fill="#388E3C" />
          <path d="M100 165 Q70 145 55 160 Q75 175 100 165" fill="#2E7D32" />
          <path d="M100 150 Q120 130 135 140 Q115 155 100 150" fill="#43A047" />
          <path d="M100 145 Q80 125 65 135 Q85 150 100 145" fill="#4CAF50" />
          <circle cx="145" cy="165" r="4" fill="#E91E63" className="animate-pulse" />
          <circle cx="55" cy="160" r="3" fill="#F48FB1" className="animate-pulse" />
        </g>
      )}

      {s >= 5 && (
        <g className="animate-sway">
          <path d="M100 250 L100 100" stroke="#2E7D32" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M100 180 Q140 160 155 175 Q135 195 100 180" fill="#388E3C" />
          <path d="M100 175 Q60 155 45 170 Q65 190 100 175" fill="#2E7D32" />
          <path d="M100 150 Q135 125 150 140 Q125 160 100 150" fill="#43A047" />
          <path d="M100 145 Q65 120 50 135 Q75 155 100 145" fill="#388E3C" />
          <path d="M100 120 Q125 95 140 110 Q115 130 100 120" fill="#4CAF50" />
          <path d="M100 115 Q75 90 60 105 Q85 125 100 115" fill="#43A047" />
          <g className="animate-float">
            <circle cx="145" cy="130" r="15" fill="#F48FB1" />
            <circle cx="145" cy="130" r="8" fill="#E91E63" />
            <circle cx="145" cy="130" r="3" fill="#FFEB3B" />
            <circle cx="60" cy="125" r="12" fill="#CE93D8" />
            <circle cx="60" cy="125" r="6" fill="#9C27B0" />
            <circle cx="60" cy="125" r="2" fill="#FFEB3B" />
            <circle cx="115" cy="85" r="14" fill="#FFF59D" />
            <circle cx="115" cy="85" r="7" fill="#FFD700" />
            <circle cx="115" cy="85" r="3" fill="#FF9800" />
          </g>
          <circle cx="160" cy="120" r="3" fill="white" className="animate-sparkle" />
          <circle cx="45" cy="140" r="2" fill="white" className="animate-sparkle" />
          <circle cx="130" cy="70" r="2.5" fill="white" className="animate-sparkle" />
          <circle cx="95" cy="60" r="2" fill="white" className="animate-sparkle" />
        </g>
      )}
      <path d="M30 300 Q50 295 70 300 Q90 295 110 300 Q130 295 150 300 Q170 295 190 300 L200 320 L0 320 Z" fill="#4CAF50" opacity="0.3" />
    </svg>
  );
}

function Sparkline({ data }: { data: { date: string; count: number }[] }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.count), 1);
  const w = 240;
  const h = 50;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.count / max) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  
  return (
    <div className="w-full max-w-xs mx-auto">
      <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full">
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * w;
          return (
            <text key={i} x={x} y={h + 18} textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace" className="opacity-50">
              {days[new Date(d.date + "T12:00:00").getDay()]}
            </text>
          );
        })}
        <defs>
          <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#sparkGrad)" className="text-teal-500" />
        <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - (d.count / max) * (h - 8) - 4;
          return <circle key={i} cx={x} cy={y} r="5" fill={d.count > 0 ? "currentColor" : "#374151"} stroke="white" strokeWidth="2" className={d.count > 0 ? "text-teal-500" : "text-gray-600"} />;
        })}
      </svg>
    </div>
  );
}

interface GardenData {
  username: string;
  today: number;
  streak: number;
  stage: number;
  totalLastYear: number;
  recent: { date: string; count: number }[];
  githubBirthday?: string;
}

function fetchGarden(username: string): Promise<GardenData> {
  return fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=all`)
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

      // Find GitHub birthday (first contribution)
      const firstContrib = [...contribs].reverse().find((d: any) => d.count > 0);
      const githubBirthday = firstContrib?.date;

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

      return { username, today: todayCount, streak, stage, totalLastYear: raw.total.lastYear, recent, githubBirthday };
    });
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
      <div className="h-80 bg-gray-200 rounded-3xl"></div>
      <div className="flex justify-center gap-2">
        <div className="h-8 bg-gray-200 rounded-full w-24"></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const initialUser = params.get("user") || "";

  const [input, setInput] = useState(initialUser);
  const [data, setData] = useState<GardenData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEncouragement(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
  }, []);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

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

  const shareToTwitter = () => {
    if (!data) return;
    const text = `🌱 My Commit Garden

@${data.username}'s plant is ${STAGES[data.stage].name}!

🔥 ${data.streak} day streak
📊 ${data.totalLastYear.toLocaleString()} commits this year

Grow yours: andreagriffiths11.github.io/commit-garden/?user=${data.username}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const bgGradient = darkMode 
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    : "bg-gradient-to-br from-rose-100 via-teal-50 to-indigo-100";

  const cardBg = darkMode ? "bg-gray-800/70" : "bg-white/70";
  const textColor = darkMode ? "text-white" : "text-gray-800";
  const subTextColor = darkMode ? "text-gray-400" : "text-gray-500";
  const inputBg = darkMode ? "bg-gray-700/80 border-gray-600" : "bg-white/80 border-gray-200";
  const inputText = darkMode ? "text-white placeholder-gray-400" : "text-gray-700 placeholder-gray-400";

  return (
    <div className={`min-h-screen ${bgGradient} flex flex-col items-center justify-center px-4 py-8 font-sans transition-colors duration-300`}>
      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="max-w-md w-full">
        {!data && !loading && !error && (
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌱</div>
            <h1 className={`text-4xl font-bold ${textColor} tracking-tight mb-2`}>commit garden</h1>
            <p className={`${subTextColor}`}>watch your code grow into something beautiful</p>
            <p className={`${subTextColor} text-sm mt-3 opacity-70`}>{encouragement}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6 justify-center">
          <div className="relative">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${subTextColor}`}>@</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="github username"
              className={`${inputBg} backdrop-blur-sm border-2 rounded-2xl pl-8 pr-4 py-3 w-52 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all ${inputText}`}
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-white font-semibold px-5 py-3 rounded-2xl transition-all shadow-lg shadow-teal-200 hover:shadow-teal-300"
          >
            Grow
          </button>
        </form>

        {loading && <Skeleton />}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && data && (
          <div className={`${cardBg} backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50`}>
            <div className="text-center mb-4">
              <h2 className={`text-2xl font-bold ${textColor}`}>
                {data.username}
                <span className={`${subTextColor} font-normal`}'s garden</span>
              </h2>
              {data.githubBirthday && (
                <p className={`${subTextColor} text-sm mt-1`}>
                  🎉 GitHub birthday: {new Date(data.githubBirthday).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>

            <div className="my-6 -mx-2">
              <PlantSVG stage={data.stage} />
            </div>

            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {data.stage === 5 && "🌸 "}
                {data.stage === 4 && "🌿 "}
                {data.stage === 3 && "🌱 "}
                {data.stage === 2 && "🌿 "}
                {data.stage === 1 && "🌱 "}
                {data.stage === 0 && "🌰 "}
                {STAGES[data.stage].name}
              </span>
              <p className={`${subTextColor} text-sm mt-2`}>{STAGES[data.stage].msg}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-600">
                <div className={`text-2xl font-bold ${textColor}`}>{data.today}</div>
                <div className={`text-xs ${subTextColor} mt-1`}>today</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-600">
                <div className={`text-2xl font-bold ${textColor}`}>{data.streak}</div>
                <div className={`text-xs ${subTextColor} mt-1`}>streak</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-600">
                <div className={`text-2xl font-bold ${textColor}`}>{data.totalLastYear.toLocaleString()}</div>
                <div className={`text-xs ${subTextColor} mt-1`}>this year</div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-600 mb-6">
              <div className={`text-xs ${subTextColor} mb-2 text-center`}>Last 7 days</div>
              <Sparkline data={data.recent} />
            </div>

            <button
              onClick={shareToTwitter}
              className="w-full py-3 px-4 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>🐦</span> Share on Twitter
            </button>
          </div>
        )}

        <div className="text-center mt-6">
          <p className={`${subTextColor} text-sm`}>
            made with ♥ by{" "}
            <a href="https://github.com/AndreaGriffiths11" className="text-teal-500 hover:underline">
              Andrea Griffiths
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
