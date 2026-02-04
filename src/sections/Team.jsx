// src/sections/Team.jsx
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
} from "lucide-react";
import React, { useEffect, useState } from "react";

function Team() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMember, setActiveMember] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const githubUsernames = [
    "peter-mwau",
    "NORMTOSH",
    "Mickmacha",
    "AdoyoClifford",
  ];

  const memberDetails = {
    "peter-mwau": {
      position: "Full Stack Developer",
      email: "pierremwau4050@gmail.com",
      linkedin: "https://www.linkedin.com/in/peter-kyale-6b11a4233/",
      website: "https://petermwauportfolio.netlify.app/",
      expertise: ["Solidity", "React", "Node.js", "MongoDB", "TypeScript", "Web3", "DApp"],
      yearsAtCompany: 1,
      skills: [
        { name: "Solidity", level: 85 },
        { name: "React", level: 95 },
        { name: "MongoDB", level: 90 },
        { name: "Web3", level: 80 },
        { name: "JavaScript", level: 92 },
        { name: "Node.js", level: 90 },
        { name: "TypeScript", level: 88 },
      ],
      contributions: [
        "Led the development of Nyota's core platform",
        "Optimized smart contract performance, reducing gas costs by 30%",
        "Integrated third-party APIs for enhanced functionality",
        "Collaborated with cross-functional teams to deliver projects on time",
        "Developed and maintained comprehensive documentation for internal use",
        "Conducted code reviews to ensure adherence to best practices",
        "Implemented CI/CD pipeline for faster deployments",
        "Mentored junior developers in modern web practices",
      ],
    },
    NORMTOSH: {
      position: "Frontend Developer",
      email: "normangitonga388@gmail.com",
      linkedin: "https://www.linkedin.com/in/normangitonga",
      expertise: ["React", "UI/UX", "Tailwind"],
      yearsAtCompany: 2,
      skills: [
        { name: "React", level: 92 },
        { name: "CSS/Tailwind", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "HTML5", level: 88 },
        { name: "TypeScript", level: 80 },
        { name: "UI/UX Design", level: 85 },
      ],
      contributions: [
        "Designed and implemented responsive UI components",
        "Collaborated with designers to enhance user experience",
        "Spearheaded the adoption of Tailwind CSS across projects",
        "Organized frontend knowledge-sharing sessions for the team",
        "Developed a design system to ensure UI consistency across applications",
        "Integrated third-party APIs to enhance application functionality",
        "Conducted user testing sessions to gather feedback for UI improvements",
        "Created interactive prototypes to streamline the design process",
      ],
    },
    Mickmacha: {
      position: "Backend Developer",
      email: "mickmacha@example.com",
      linkedin: "https://linkedin.com/in/mickmacha",
      expertise: ["Python", "Django", "PostgreSQL"],
      yearsAtCompany: 2,
      skills: [
        { name: "Python", level: 93 },
        { name: "Django", level: 90 },
        { name: "PostgreSQL", level: 87 },
        { name: "API Design", level: 89 },
      ],
      contributions: [
        "Architected scalable backend infrastructure",
        "Developed RESTful APIs consumed by frontend applications",
        "Implemented database optimizations improving query performance",
        "Collaborated with frontend developers to define API contracts",
        "Integrated caching mechanisms to enhance application speed",
        "Ensured security best practices in all backend services",
        "Wrote unit and integration tests to maintain code quality",
        "Implemented secure authentication system",
        "Reduced API response time by 50%",
      ],
    },
    AdoyoClifford: {
      position: "DevOps Engineer",
      email: "adoyoclifford@example.com",
      linkedin: "https://linkedin.com/in/adoyoclifford",
      expertise: ["Docker", "Kubernetes", "AWS"],
      yearsAtCompany: 1,
      skills: [
        { name: "Docker", level: 91 },
        { name: "Kubernetes", level: 88 },
        { name: "AWS", level: 86 },
        { name: "CI/CD", level: 90 },
      ],
      contributions: [
        "Set up automated deployment pipelines",
        "Managed cloud infrastructure on AWS",
        "Implemented containerization using Docker and Kubernetes",
        "Monitored system performance and optimized resource usage",
        "Established infrastructure as code practices using Terraform",
        "Improved deployment frequency and reduced lead time for changes",
        "Enhanced system reliability with automated scaling solutions",
        "Reduced infrastructure costs by 30%",
        "Implemented monitoring and alerting systems",
      ],
    },
  };

  const calculateYearsAndDaysSince = (dateString) => {
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
  };

  const getYearsOnGithubLabel = (member) => {
    if (!member) return "0 days";
    if (member.createdAt)
      return calculateYearsAndDaysSince(member.createdAt).label;
    if (member.yearsOnGithub?.label) return member.yearsOnGithub.label;
    return "0 days";
  };

  useEffect(() => {
    const fetchGitHubProfiles = async () => {
      try {
        setLoading(true);
        const profilesData = await Promise.all(
          githubUsernames.map(async (username) => {
            try {
              const response = await fetch(
                `https://api.github.com/users/${username}`,
              );
              if (!response.ok) {
                console.error(
                  `Failed to fetch ${username}: ${response.status} ${response.statusText}`,
                );
                throw new Error(`Failed to fetch ${username}`);
              }
              const data = await response.json();

              const reposResponse = await fetch(data.repos_url);
              const repos = reposResponse.ok ? await reposResponse.json() : [];
              const topRepos = repos
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 2);

              const profileData = {
                username: data.login,
                name: data.name || data.login,
                bio:
                  data.bio || memberDetails[username]?.position || "Developer",
                imageUrl: data.avatar_url,
                github: data.html_url,
                followers: data.followers,
                following: data.following,
                publicRepos: data.public_repos,
                createdAt: data.created_at,
                yearsOnGithub: calculateYearsAndDaysSince(data.created_at),
                location: data.location || "Kenya",
                topRepos,
                ...memberDetails[username],
              };

              return profileData;
            } catch (error) {
              console.error(`Error fetching ${username}:`, error);
              throw error;
            }
          }),
        );
        setProfiles(profilesData);
        if (profilesData.length > 0) setActiveMember(profilesData[0]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching GitHub profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (githubUsernames.length > 0) fetchGitHubProfiles();
  }, []);

  const selectMember = (profile, openOnMobile = false) => {
    setActiveMember(profile);
    if (openOnMobile) setIsMobileOpen(true);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading team members...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center p-8 bg-gray-900 rounded-xl shadow-lg max-w-md">
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
    <div className="h-screen relative text-white overflow-hidden">
      {/* ensure background is underneath */}

      <style>{`
        .line-clamp-6 { display:-webkit-box; -webkit-line-clamp:6; -webkit-box-orient:vertical; overflow:hidden; }
        .thin-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .thin-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 6px; }
      `}</style>

      {/* content above background (z-10) and allow children to shrink (min-h-0) */}
      <div className="h-full flex flex-col container mx-auto px-4 py-4 relative z-10 min-h-0">
        {/* Header */}
        <div className="relative mt-6 mb-6 h-20 sm:h-28 flex items-center justify-center shrink-0">
          <h2 className="absolute inset-0 flex items-center justify-center text-center text-6xl sm:text-7xl md:text-8xl font-extrabold text-white/8 uppercase tracking-widest pointer-events-none select-none">
            Experts
          </h2>
          <h3 className="text-gray-400 relative z-10 text-2xl sm:text-3xl tracking-widest px-3 py-1 rounded-3xl">
            Our Team
          </h3>
        </div>

        {/* Desktop layout (hidden on small screens). container uses min-h-0 so children with overflow-auto can work */}
        <div className="hidden lg:flex flex-1 gap-6 max-w-6xl mx-auto w-full max-h-[calc(80vh-12rem)] min-h-0">
          {/* Sidebar */}
          <aside className="w-1/4">
            <div className="sticky top-4 h-[calc(100vh-10rem)] overflow-auto thin-scrollbar space-y-4 p-2">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Team Members</h3>
              <div className="space-y-3">
                {profiles.map((profile) => (
                  <button
                    key={profile.username}
                    onClick={() => selectMember(profile)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl border ${activeMember?.username === profile.username ? 'border-cyan-400 bg-gray-900' : 'border-gray-700 bg-gray-900/40'} hover:border-blue-400 transition-all text-left`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
                      <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{profile.name}</h4>
                      <p className="text-xs text-gray-400 truncate">{profile.position}</p>
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
                      <img src={activeMember.imageUrl} alt={activeMember.login} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-2xl font-bold truncate">{activeMember.name}</h2>
                        <p className="text-sm text-blue-300 mt-1 truncate">{activeMember.bio}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {activeMember.github && (
                          <a href={activeMember.github} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                            <Github className="w-5 h-5 text-blue-300" />
                          </a>
                        )}
                        {activeMember.linkedin && (
                          <a href={activeMember.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                            <Linkedin className="w-5 h-5 text-blue-300" />
                          </a>
                        )}
                        {activeMember.email && (
                          <a href={`mailto:${activeMember.email}`} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                            <Mail className="w-5 h-5 text-blue-300" />
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
                      {activeMember.yearsAtCompany && (
                        <div className="flex items-center gap-2">
                          <Calendar1 className="w-4 h-4" />
                          <span>{activeMember.yearsAtCompany} yr{activeMember.yearsAtCompany>1?'s':''}</span>
                        </div>
                      )}
                      {activeMember.publicRepos && (
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
                          <h3 className="text-lg font-semibold text-blue-300 mb-1">About</h3>
                          <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">{activeMember.bio}</p>
                        </div>
                      )}

                      {(activeMember.contributions || []).length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2"><Award className="w-4 h-4" /> Key Contributions</h3>
                          <ul className="space-y-2 text-sm text-gray-300">
                            {activeMember.contributions.map((c, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <aside className="space-y-3">
                      <div className="bg-gray-800 rounded-xl p-3">
                        <h4 className="text-sm font-semibold text-blue-300 mb-2">GitHub Stats</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center p-2 bg-gray-900 rounded-md border border-gray-700">
                            <p className="text-lg font-bold">{activeMember.followers || 0}</p>
                            <p className="text-xs text-gray-400">Followers</p>
                          </div>
                          <div className="text-center p-2 bg-gray-900 rounded-md border border-gray-700">
                            <p className="text-lg font-bold">{activeMember.publicRepos || 0}</p>
                            <p className="text-xs text-gray-400">Repos</p>
                          </div>
                          <div className="text-center p-2 bg-gray-900 rounded-md border border-gray-700">
                            <p className="text-sm font-semibold">{getYearsOnGithubLabel(activeMember)}</p>
                            <p className="text-xs text-gray-400">On GitHub</p>
                          </div>
                          <div className="text-center p-2 bg-gray-900 rounded-md border border-gray-700">
                            <p className="text-sm font-semibold">{activeMember.following || 0}</p>
                            <p className="text-xs text-gray-400">Following</p>
                          </div>
                        </div>
                      </div>

                      {activeMember.skills && (
                        <div className="bg-gray-800 rounded-xl p-3">
                          <h4 className="text-sm font-semibold text-blue-300 mb-2">Top Skills</h4>
                          <div className="flex flex-wrap gap-1 text-xs">
                            {activeMember.skills.slice(0, 4).map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-gray-200">{s.name}</span>
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

        {/* Mobile list + mobile panel (shows on small screens). ensure it can scroll */}
        <div className="lg:hidden flex-1 overflow-auto min-h-0">
          {/* show empty state if no profiles */}
          {profiles.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No team members found.</div>
          ) : (
            <div className="space-y-3">
              {profiles.map((profile) => (
                <button
                  key={profile.username}
                  onClick={() => selectMember(profile, true)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border ${activeMember?.username === profile.username ? 'border-cyan-400 bg-gray-900' : 'border-gray-700 bg-gray-900/40'} hover:border-cyan-300 transition-all`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
                    <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{profile.name}</h4>
                    <p className="text-xs text-gray-400 truncate">{profile.position}</p>
                  </div>
                  {activeMember?.username === profile.username && <ChevronRight className="w-5 h-5 text-cyan-400" />}
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
                    <h3 className="text-lg font-semibold text-white">Member Details</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeMember.github && (
                      <a href={activeMember.github} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700" title="GitHub">
                        <Github className="w-5 h-5 text-blue-300" />
                      </a>
                    )}
                    {activeMember.linkedin && (
                      <a href={activeMember.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700" title="LinkedIn">
                        <Linkedin className="w-5 h-5 text-blue-300" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-800">
                      <img src={activeMember.imageUrl} alt={activeMember.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold truncate">{activeMember.name}</h2>
                      <p className="text-sm text-blue-300 truncate">{activeMember.bio}</p>
                      <div className="mt-2 text-xs text-gray-400 flex gap-3 flex-wrap">
                        {activeMember.location && <span className="flex items-center gap-1"><MapPinCheck className="w-3 h-3" />{activeMember.location}</span>}
                        {activeMember.yearsAtCompany && <span className="flex items-center gap-1"><Calendar1 className="w-3 h-3" />{activeMember.yearsAtCompany} yr</span>}
                        {activeMember.publicRepos !== undefined && <span className="flex items-center gap-1"><Code2 className="w-3 h-3" />{activeMember.publicRepos} repos</span>}
                      </div>
                    </div>
                  </div>

                  {activeMember.bio && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-300 mb-1">About</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{activeMember.bio}</p>
                    </div>
                  )}

                  {(activeMember.contributions || []).length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2"><Award className="w-4 h-4" /> Key Contributions</h4>
                      <ul className="list-inside list-disc text-sm text-gray-300 space-y-2">
                        {activeMember.contributions.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeMember.skills && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-300 mb-2">Top Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeMember.skills.slice(0, 8).map((s, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs">{s.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Team;
