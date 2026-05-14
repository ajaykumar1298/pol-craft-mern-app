import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a14] px-6">
      <div className="w-full max-w-[500px] rounded-2xl border border-[#2a2a3d] bg-[#12122a] p-10 text-center shadow-xl">
        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-[#7c3aed]">404</h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-bold text-white">Page Not Found</h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-[#9ca3af]">
          The page you are looking for does not exist or may have been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-xl bg-[#7c3aed] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="rounded-xl border border-[#374151] px-5 py-3 text-sm font-semibold text-[#d1d5db] transition hover:border-[#7c3aed] hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
