// src/sections/Team.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Award,
  ChevronRight,
  Calendar1,
  Code2,
  MapPinCheck,
  X,
  Play,
  Pause,
} from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useInView } from "../hooks/useInView";
import { teamMembers } from "../constants/teams";
import liveChatAnimation from "../lottie/developer.json";

function calculateYearsAndDaysSince(dateString) {
  if (!dateString) return { years: 0, days: 0, label: "0 days" };
  const start = new Date(dateString);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  const anniversaryThisYear = new Date(
    now.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  if (now < anniversaryThisYear) years -= 1;

  const lastAnniversaryYear =
    now < anniversaryThisYear ? now.getFullYear() - 1 : now.getFullYear();
  const lastAnniversary = new Date(
    lastAnniversaryYear,
    start.getMonth(),
    start.getDate(),
  );

  const msInDay = 1000 * 60 * 60 * 24;
  const days = Math.max(0, Math.floor((now - lastAnniversary) / msInDay));

  const labelParts = [];
  if (years > 0) labelParts.push(`${years} yr${years === 1 ? "" : "s"}`);
  labelParts.push(`${days} day${days === 1 ? "" : "s"}`);

  return { years, days, label: labelParts.join(" ") };
}

export default function Team() {
  const [profiles, setProfiles] = useState([]); // merged local + github data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMember, setActiveMember] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const playerRef = useRef(null);
  const [_isPlaying, setIsPlaying] = useState(true);

  const [sectionRef] = useInView();

  // fetch GitHub data and merge with local team data
  useEffect(() => {
    let cancelled = false;
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          teamMembers.map(async (local) => {
            const username = local.username;
            // Prepare a base profile from local data
            const base = {
              username,
              name: local.name,
              position: local.position,
              email: local.email,
              linkedin: local.linkedin,
              website: local.website,
              expertise: local.expertise || [],
              yearsAtCompany: local.yearsAtCompany || 0,
              skills: local.skills || [],
              contributions: local.contributions || [],
              avatarFallback: local.avatarFallback || "",
              location: local.location || "",
              bio: local.bio || local.position || "",
            };

            // Try to get GitHub public info - if fails, keep local base
            try {
              const res = await fetch(
                `https://api.github.com/users/${username}`,
              );
              if (!res.ok) {
                // if rate-limited or not found, return base
                return { ...base };
              }
              const data = await res.json();

              // fetch repos (top 2)
              let topRepos = [];
              try {
                const reposRes = await fetch(data.repos_url + "?per_page=50");
                if (reposRes.ok) {
                  const repos = await reposRes.json();
                  topRepos = (repos || [])
                    .sort(
                      (a, b) =>
                        (b.stargazers_count || 0) - (a.stargazers_count || 0),
                    )
                    .slice(0, 2)
                    .map((r) => ({
                      name: r.name,
                      url: r.html_url,
                      stars: r.stargazers_count || 0,
                    }));
                }
              } catch {
                // ignore repo errors
              }

              const merged = {
                ...base,
                login: data.login,
                imageUrl: data.avatar_url || base.avatarFallback,
                github: data.html_url,
                followers: data.followers,
                following: data.following,
                publicRepos: data.public_repos,
                createdAt: data.created_at,
                yearsOnGithub: calculateYearsAndDaysSince(data.created_at),
                topRepos,
                location: data.location || base.location,
                bio: data.bio || base.bio,
              };

              return merged;
            } catch {
              // network or other error - return base
              return { ...base };
            }
          }),
        );

        if (cancelled) return;
        setProfiles(results);
        setActiveMember((prev) => prev || results[0] || null);
      } catch (_err) {
        if (cancelled) return;
        console.error("Error loading team profiles", _err);
        setError("Failed to load team profiles.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfiles();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectMember = (profile, openOnMobile = false) => {
    setActiveMember(profile);
    if (openOnMobile) setIsMobileOpen(true);
  };

  // Player controls
  const _handlePlayerReady = (instance) => {
    // store instance (the Player component exposes imperative API via ref)
    playerRef.current = instance;
    // if autoplay: ensure it's playing
    try {
      playerRef.current?.play?.();
      setIsPlaying(true);
    } catch {
      // ignore
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-400">Loading team members...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="p-8 bg-gray-900 rounded-xl shadow-lg">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Error</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div
      ref={sectionRef}
      className="h-screen relative text-white overflow-y-auto no-scrollbar py-12"
    >
      <style>{`
        .thin-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .thin-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 6px; }
        .line-clamp-6 { display:-webkit-box; -webkit-line-clamp:6; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>

      <div className="h-auto overlay-y-auto flex flex-col container mx-auto px-4 py-6 relative z-10 min-h-0">
        {/* Header (Lottie + intro) */}
        <div className="w-full h-auto max-w-6xl mx-auto mb-8 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-400/20">
                  Meet the team
                </span>
                <div className="text-sm text-white/60">
                  Engineers & creators
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Team — People who build and ship
              </h1>

              <p className="text-gray-300 max-w-2xl">
                We&apos;re a small, cross-functional team of engineers,
                designers and devops who ship production-ready software. Click
                any profile to learn more about their work and impact.
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => {
                    // focus first profile when clicked
                    const first = document.querySelector("[data-team-item]");
                    first?.scrollIntoView?.({
                      behavior: "smooth",
                      block: "center",
                    });
                    first?.focus?.();
                  }}
                  className="px-4 py-2 rounded-md bg-cyan-400 hover:bg-cyan-500 text-black font-semibold shadow"
                >
                  View team
                </button>

                <button
                  onClick={() => {
                    // TODO: Implement navigation to contacts section
                    // This would typically use the onNavigate prop passed from Home
                  }}
                  className="px-4 py-2 rounded-md border border-white/10 text-white/90 hover:bg-white/5"
                  disabled
                >
                  Contact us
                </button>
              </div>
            </div>

            {/* Right: Lottie Player */}
            <div className="flex justify-center">
              <div className="w-full max-w-[360px] rounded-2xl shadow-lg">
                <Player
                  autoplay
                  loop
                  keepLastFrame={false}
                  src={liveChatAnimation}
                  ref={playerRef}
                  onEvent={() => {
                    /* optional: debug or handle events, e.g. 'load' */
                  }}
                  style={{ width: "150%", height: 360 }}
                  className="rounded-lg"
                />

                {/* <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-gray-400">Live interaction demo</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause animation" : "Play animation"}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/8"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-cyan-300" /> : <Play className="w-4 h-4 text-cyan-300" />}
                    </button>
                    <button
                      onClick={stopPlayer}
                      aria-label="Stop animation"
                      className="p-2 rounded-full bg-white/5 hover:bg-white/8"
                    >
                      <X className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:flex flex-1 gap-6 max-w-6xl py-20 mx-auto w-full max-h-[calc(80vh-12rem)] min-h-0">
          <aside className="w-1/4">
            <div className="sticky top-4 h-[calc(100vh-10rem)] overflow-auto thin-scrollbar space-y-4 p-2">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                Team Members
              </h3>
              <div className="space-y-3">
                {profiles.map((profile) => (
                  <button
                    data-team-item
                    key={profile.username}
                    onClick={() => selectMember(profile)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl border ${activeMember?.username === profile.username ? "border-cyan-400 bg-gray-900" : "border-gray-700 bg-gray-900/40"} hover:border-cyan-300 transition-all text-left`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
                      <img
                        src={profile.imageUrl || profile.avatarFallback}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">
                        {profile.name}
                      </h4>
                      <p className="text-xs text-gray-400 truncate">
                        {profile.position}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Active panel */}
          <main className="flex-1 h-full min-h-0">
            {activeMember ? (
              <div className="h-full bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700 flex flex-col overflow-hidden">
                <header className="flex items-center gap-4 px-6 py-4 border-b border-gray-700 shrink-0">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-800 shadow-md">
                      <img
                        src={
                          activeMember.imageUrl || activeMember.avatarFallback
                        }
                        alt={activeMember.login || activeMember.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-2xl font-bold truncate">
                          {activeMember.name}
                        </h2>
                        <p className="text-sm text-cyan-300 mt-1 truncate">
                          {activeMember.position || activeMember.bio}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {activeMember.github && (
                          <a
                            href={activeMember.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                          >
                            <Github className="w-5 h-5 text-cyan-300" />
                          </a>
                        )}
                        {activeMember.linkedin && (
                          <a
                            href={activeMember.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                          >
                            <Linkedin className="w-5 h-5 text-cyan-300" />
                          </a>
                        )}
                        {activeMember.email && (
                          <a
                            href={`mailto:${activeMember.email}`}
                            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                          >
                            <Mail className="w-5 h-5 text-cyan-300" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-3 text-gray-400 text-sm">
                      {activeMember.location && (
                        <div className="flex items-center gap-2">
                          <MapPinCheck className="w-4 h-4" />
                          <span>{activeMember.location}</span>
                        </div>
                      )}
                      {activeMember.yearsAtCompany !== undefined && (
                        <div className="flex items-center gap-2">
                          <Calendar1 className="w-4 h-4" />
                          <span>
                            {activeMember.yearsAtCompany} yr
                            {activeMember.yearsAtCompany > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                      {activeMember.publicRepos !== undefined && (
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4" />
                          <span>{activeMember.publicRepos} repos</span>
                        </div>
                      )}
                    </div>
                  </div>
                </header>

                <div className="flex-1 overflow-auto p-6 min-h-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      {activeMember.bio && (
                        <div>
                          <h3 className="text-lg font-semibold text-cyan-300 mb-1">
                            About
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">
                            {activeMember.bio}
                          </p>
                        </div>
                      )}

                      {(activeMember.contributions || []).length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4" /> Key Contributions
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-300">
                            {activeMember.contributions.map((c, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <aside className="space-y-3">
                      <div className="bg-gray-800 rounded-xl p-3">
                        <h4 className="text-sm font-semibold text-cyan-300 mb-2">
                          GitHub Stats
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center p-2 bg-gray-900 rounded-md border border-gray-700">
                            <p className="text-lg font-bold">
                              {activeMember.followers || 0}
                            </p>
                            <p className="text-xs text-gray-400">Followers</p>
                          </div>
                          <div className="text-center p-2 bg-gray-900 rounded-md border border-gray-700">
                            <p className="text-lg font-bold">
                              {activeMember.publicRepos || 0}
                            </p>
                            <p className="text-xs text-gray-400">Repos</p>
                          </div>
                          <div className="text-center p-2 bg-gray-900 rounded-md border border-gray-700">
                            <p className="text-sm font-semibold">
                              {activeMember.yearsOnGithub?.label || "—"}
                            </p>
                            <p className="text-xs text-gray-400">On GitHub</p>
                          </div>
                          <div className="text-center p-2 bg-gray-900 rounded-md border border-gray-700">
                            <p className="text-sm font-semibold">
                              {activeMember.following || 0}
                            </p>
                            <p className="text-xs text-gray-400">Following</p>
                          </div>
                        </div>
                      </div>

                      {activeMember.skills && (
                        <div className="bg-gray-800 rounded-xl p-3">
                          <h4 className="text-sm font-semibold text-cyan-300 mb-2">
                            Top Skills
                          </h4>
                          <div className="flex flex-wrap gap-1 text-xs">
                            {activeMember.skills.slice(0, 6).map((s, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-white/5 rounded text-gray-200"
                              >
                                {s.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </aside>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No active member selected.
              </div>
            )}
          </main>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex-1 overflow-auto min-h-0">
          {profiles.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No team members found.
            </div>
          ) : (
            <div className="space-y-3">
              {profiles.map((profile) => (
                <button
                  key={profile.username}
                  onClick={() => selectMember(profile, true)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border ${activeMember?.username === profile.username ? "border-cyan-400 bg-gray-900" : "border-gray-700 bg-gray-900/40"} hover:border-cyan-300 transition-all`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
                    <img
                      src={profile.imageUrl || profile.avatarFallback}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">
                      {profile.name}
                    </h4>
                    <p className="text-xs text-gray-400 truncate">
                      {profile.position}
                    </p>
                  </div>
                  {activeMember?.username === profile.username && (
                    <ChevronRight className="w-5 h-5 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* mobile full-screen detail panel */}
          {isMobileOpen && activeMember && (
            <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md p-4 overflow-auto">
              <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsMobileOpen(false)}
                      aria-label="Back"
                      className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 mr-2"
                    >
                      <X className="w-5 h-5 text-gray-300" />
                    </button>
                    <h3 className="text-lg font-semibold text-white">
                      Member Details
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeMember.github && (
                      <a
                        href={activeMember.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-gray-800 rounded-md hover:bg-gray-700"
                        title="GitHub"
                      >
                        <Github className="w-5 h-5 text-cyan-300" />
                      </a>
                    )}
                    {activeMember.linkedin && (
                      <a
                        href={activeMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-gray-800 rounded-md hover:bg-gray-700"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5 text-cyan-300" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-800">
                      <img
                        src={
                          activeMember.imageUrl || activeMember.avatarFallback
                        }
                        alt={activeMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold truncate">
                        {activeMember.name}
                      </h2>
                      <p className="text-sm text-cyan-300 truncate">
                        {activeMember.position}
                      </p>
                      <div className="mt-2 text-xs text-gray-400 flex gap-3 flex-wrap">
                        {activeMember.location && (
                          <span className="flex items-center gap-1">
                            <MapPinCheck className="w-3 h-3" />
                            {activeMember.location}
                          </span>
                        )}
                        {activeMember.yearsAtCompany !== undefined && (
                          <span className="flex items-center gap-1">
                            <Calendar1 className="w-3 h-3" />
                            {activeMember.yearsAtCompany} yr
                          </span>
                        )}
                        {activeMember.publicRepos !== undefined && (
                          <span className="flex items-center gap-1">
                            <Code2 className="w-3 h-3" />
                            {activeMember.publicRepos} repos
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {activeMember.bio && (
                    <div>
                      <h4 className="text-sm font-semibold text-cyan-300 mb-1">
                        About
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {activeMember.bio}
                      </p>
                    </div>
                  )}

                  {(activeMember.contributions || []).length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4" /> Key Contributions
                      </h4>
                      <ul className="list-inside list-disc text-sm text-gray-300 space-y-2">
                        {activeMember.contributions.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeMember.skills && (
                    <div>
                      <h4 className="text-sm font-semibold text-cyan-300 mb-2">
                        Top Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeMember.skills.slice(0, 8).map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/5 rounded text-xs"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-sm text-gray-400">
                    <div>Contact:</div>
                    {activeMember.email && (
                      <div className="mt-1">
                        <a
                          href={`mailto:${activeMember.email}`}
                          className="underline"
                        >
                          {activeMember.email}
                        </a>
                      </div>
                    )}
                    {activeMember.website && (
                      <div className="mt-1">
                        <a
                          href={activeMember.website}
                          className="underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {activeMember.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
