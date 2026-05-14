import { Link } from "react-router-dom";
import { getUserDetails } from "../utils/storage";

function Home() {
  const user = getUserDetails();

  const features = [
    ["📋", "Easy Builder", "Drag and build polls with multiple questions"],
    [
      "🔗",
      "Shareable Links",
      "One link, global reach — no signup needed to respond",
    ],
    [
      "📊",
      "Live Analytics",
      "Watch responses roll in with real-time dashboards",
    ],
    ["⏰", "Auto Expiry", "Set it and forget it — polls close automatically"],
  ];

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center bg-[#0a0a14] text-white text-center p-8">
      <div className="max-w-[620px] w-full">
        {/* Logo */}
        <div className="text-[56px] mb-4">🌐</div>

        {/* Heading */}
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-violet-400 mb-4 leading-tight">
          PollSphere
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-8 leading-7">
          Create powerful polls, share them with the world, and collect
          real-time feedback with beautiful analytics.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-violet-700 hover:bg-violet-800 text-white px-8 py-3 rounded-xl font-semibold text-base transition"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-violet-700 hover:bg-violet-800 text-white px-8 py-3 rounded-xl font-semibold text-base transition"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="border border-violet-700 text-violet-400 hover:bg-violet-700 hover:text-white px-8 py-3 rounded-xl font-semibold text-base transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-5 mt-16">
          {features.map(([icon, title, desc]) => (
            <div
              key={title}
              className="bg-[#12122a] border border-[#2a2a3d] rounded-xl p-5 text-left hover:-translate-y-1 hover:border-violet-700 transition duration-300"
            >
              <div className="text-3xl mb-3">{icon}</div>

              <div className="font-semibold text-slate-200 mb-1">{title}</div>

              <div className="text-gray-500 text-sm leading-6">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
