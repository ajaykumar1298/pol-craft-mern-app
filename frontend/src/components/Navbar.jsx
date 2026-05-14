// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getUserDetails, removeUserDetails } from "../utils/storage";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserDetails, removeUserDetails } from "../utils/storage";

export default function Navbar() {
  // const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   removeUserDetails();
  //   navigate("/login");
  // };
  // useEffect(() => {
  //   const storedUser = getUserDetails();
  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   setUser(storedUser);
  // }, [location]);

  const [user, setUser] = useState(getUserDetails());

  const handleLogout = () => {
    removeUserDetails();
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const user = getUserDetails();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(user);
  }, [location]);
  const hideUserSection =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-[#2a2a3d] bg-[#0f0f1a] px-8">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 no-underline">
        <span className="text-[22px] font-bold tracking-[-1px] text-[#a78bfa]">
          🌐 PollCraft
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user && !hideUserSection ? (
          <>
            <Link
              to="/dashboard"
              className="text-sm text-[#c4b5fd] no-underline transition hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/create"
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-medium text-white no-underline transition hover:bg-[#6d28d9]"
            >
              + New Poll
            </Link>
            <span className="text-sm text-[#888]">Hi, {user.username}</span>

            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-md border border-[#444] px-3 py-1.5 text-[13px] text-[#aaa] transition hover:border-[#666] hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-[#c4b5fd] no-underline transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm text-white no-underline transition hover:bg-[#6d28d9]"
            >
              Create Account
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
