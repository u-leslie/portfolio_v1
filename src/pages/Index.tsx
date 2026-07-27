import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
} from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { projects } from "../constants/data.ts";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
} from "lucide-react";
import { GitHubContributionsGraph } from "../components/features/github/components/contributions-graph";
import { getGitHubContributions } from "../components/features/github/server/get-contributions";
import { StravaIcon } from "../components/features/strava/components/strava-icon";

export default function Index() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Index");
  const [contributions, setContributions] = useState<Array<{ date: string; count: number; level: number }>>([]);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scrollY = useMotionValue(0);
  
  // Calculate navbar opacity based on scroll
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 0.85]);
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"]
  );

  useEffect(() => {
    setMounted(true);
    // Set default theme to light
    if (mounted && theme === "dark") {
      setTheme("light");
    }
  }, [mounted, theme, setTheme]);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  useEffect(() => {
    getGitHubContributions().then(setContributions).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        className="sticky top-0 w-full z-40 py-6 backdrop-blur-sm"
        style={{
          backgroundColor: navbarBg,
        }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center gap-8 text-sm font-normal">
            <button
              onClick={() => setActiveTab("Index")}
              className={`${
                activeTab === "Index"
                  ? "text-black font-semibold"
                  : "text-black/50 hover:text-black"
              } transition-colors`}
            >
              Index
            </button>
            <a
              href="https://docs.google.com/document/d/1v6ctfIN5Qyp9rQWTW8hO6Tmo_B-z-DwcUgXN499r8dQ/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/50 hover:text-black transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </motion.nav>

      <main className="pt-8">
        {/* Hero Section - Minimal */}
        <section className="min-h-[80vh] flex flex-col justify-center">
          <div className="w-full lg:max-w-2xl mx-auto px-6 sm:px-6 lg:px-16 py-8">
              <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-sm font-bold mb-1.5 text-black/90">
                  Anne Leslie UHIRIWE
                </h1>
                <p className="text-sm font-normal text-black/70 mb-10">
                  Software Engineer
                </p>

                {/* About */}
                <div className="w-full space-y-4 text-sm font-normal text-black/80 leading-relaxed mb-16 break-words">
                  <p className="break-words">
                    I'm a software engineer and designer focused on building clean, seamless digital experiences. I enjoy crafting minimal, functional interfaces that blend aesthetics with usability, creating products that feel as good as they look.
                  </p>
                  <p className="break-words">
                    I love building software, exploring new technologies and DevOps concepts, and expressing <a href="https://art.lslie.space/" target="_blank" rel="noopener noreferrer" className="font-bold text-black hover:underline break-all">creativity through art, poetry, and photography</a>, using visuals and design to connect technology with human emotion.
                  </p>
          </div>

                {/* Contributions Graph */}
                <div className="mt-16 mb-16 w-full overflow-hidden">
                  <h2 className="text-sm font-semibold mb-6">Contributions</h2>
                  {contributions.length > 0 ? (
                    <div className="w-full overflow-x-auto -mx-4 sm:mx-0 scrollbar-hide">
                      <div className="min-w-[600px] px-4 sm:px-0 sm:min-w-0">
                        <GitHubContributionsGraph contributions={contributions} />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[200px] flex items-center justify-center">
                      <div className="text-sm text-black/50">Loading contributions...</div>
                    </div>
                  )}
                </div>

                {/* Works */}
                <div className="space-y-3 mt-16">
                  <h2 className="text-sm font-semibold mb-6">Works</h2>
                  {projects.map((project) => (
                      <a
                  key={project.title}
                        href={project.link || "#"}
                        target={project.link ? "_blank" : undefined}
                        rel={project.link ? "noopener noreferrer" : undefined}
                        className="group block bg-black text-white rounded-lg p-4 hover:opacity-90 transition-opacity w-full overflow-hidden box-border"
                      >
                        <div className="flex items-start justify-between gap-2 min-w-0">
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <h3 className="text-sm font-medium mb-0.5 break-words overflow-wrap-anywhere">
                              {project.title}
                            </h3>
                            <p className="text-xs font-normal text-white/80 break-words overflow-wrap-anywhere">
                              {project.description}
                            </p>
                          </div>
                          {project.link && (
                            <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      </a>
                        ))}
                      </div>

                {/* Playground Section */}
                <div className="mt-16">
                  <h2 className="text-sm font-semibold mb-6">Playground</h2>
                  <div className="space-y-2">
                    <a
                      href="http://13.60.16.21:4000/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-black text-white rounded-lg p-3 hover:opacity-90 transition-opacity w-full overflow-hidden box-border"
                    >
                      <div className="flex items-start justify-between gap-2 min-w-0">
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <h3 className="text-sm font-medium mb-0.5 break-words overflow-wrap-anywhere">
                            Skitt
                          </h3>
                          <p className="text-xs font-normal text-white/80 break-words overflow-wrap-anywhere">
                            Feature flags & A/B testing platform
                          </p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                      </div>
                    </a>
                  </div>
                  </div>

                {/* Contact Section */}
                <div className="mt-16">
                  <h2 className="text-sm font-semibold mb-6">Contact</h2>
                  <div className="flex items-center gap-6">
                    <a
                      href="https://github.com/u-leslie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/uhiriwe-anne-leslie-040552256"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:anneuhiriwe@gmail.com"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/_u.leslie_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.strava.com/athletes/1370297453"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 hover:text-black transition-colors"
                      aria-label="Strava"
                    >
                      <StravaIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
