

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
// import "./projects.scss";
import '../components/styles/projects.scss'

/**
 * <Projects />
 * -----------------------------------------------------------------------
 * A scroll-driven stacking project carousel, rebuilt from the Framer
 * "Testimonial Field" pattern. It lives inside a fixed-height, self-
 * scrolling white container:
 *
 *   - Scrolling DOWN inside the container drives the current card up and
 *     into a "stack" that peeks out above the active card, in the order
 *     you scrolled past them.
 *   - Scrolling UP reverses it exactly: the top of the stack un-stacks
 *     and slides back down to become the active card again, while the
 *     active card drops back down underneath the container and
 *     disappears (waiting to reappear on the way back down).
 *
 * The whole thing is driven by the container's own native scrollbar via
 * framer-motion's useScroll({ container }) — there is no autoplay timer.
 *
 * Usage in Home.jsx:
 *   import Projects from "./Projects";
 *   <Projects />                       // uses the sample data below
 *   <Projects projects={myProjects} /> // or bring your own
 *
 * Each project object supports:
 *   id, category, title, description, image, color, tech[], liveUrl, repoUrl
 * -----------------------------------------------------------------------
 */

import moodtuneImg from "../assets/moodtune.png"
import insta from "../assets/insta.png"
import studio from "../assets/studio.png"

const DEFAULT_PROJECTS = [
  {
    id: "proj-01",
    category: "Music Streaming Platform",
    title: "MoodTune",
    description:
      "MoodTune is a mood-based music streaming application that recommends music to match your emotions. It features secure authentication, personalized song discovery, and seamless audio streaming with cloud-based storage for music and artwork.",
    image: moodtuneImg,
    color: "#1b2a4a",
    tech: [
      "React",
      "Vite",
      "SCSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "JWT",
      "REST APIs",
      "Vercel",
      "Render",
    ],
    liveUrl: "https://mood-tune-neon.vercel.app/",
    repoUrl: "https://github.com/vivekm500/MoodTune",
  },
  {
    id: "proj-02",
    category: "Social Media",
    title: "Social Media Web App",
    description:
      "A full-stack social media platform featuring secure authentication, user profiles, posts, likes, and follow/unfollow functionality.",
    image: insta,
    color: "#f95f28",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Rest API's", "JWT"],
    liveUrl: "#",
    repoUrl:
      "https://github.com/vivekm500/Backend-Learning/tree/main/Project-01",
  },
  {
    id: "proj-03",
    category: "Web",
    title: "Frontend",
    description:
      "A responsive and visually appealing website frontend built with HTML and CSS, featuring a clean layout, modern styling, and an intuitive user interface.",
    image: studio,
    color: "#865b9dfd",
    tech: ["HTML", "SCSS"],
    liveUrl: "https://vivekm500.github.io/frontend-learning/project_03/",
    repoUrl:
      "https://github.com/vivekm500/frontend-learning/tree/main/project_03",
  },
  // {
  //   id: "proj-04",
  //   category: "E-commerce",
  //   title: "Loam Studio",
  //   description:
  //     "A ceramics storefront where every product page loads like a gallery wall. Conversion rate doubled within the first month.",
  //   image: "https://picsum.photos/seed/loamstudio/900/700",
  //   color: "#234d3b",
  //   tech: ["Shopify", "Liquid", "Tailwind CSS"],
  //   liveUrl: "#",
  //   repoUrl: "#",
  // },
  // {
  //   id: "proj-05",
  //   category: "Design System",
  //   title: "Atlas Kit",
  //   description:
  //     "A component library shared across six product teams, cutting new-feature build time by roughly a third.",
  //   image: "https://picsum.photos/seed/atlaskit/900/700",
  //   color: "#4b2142",
  //   tech: ["React", "Storybook", "Style Dictionary"],
  //   liveUrl: "#",
  //   repoUrl: "#",
  // },
  // {
  //   id: "proj-06",
  //   category: "Marketing Site",
  //   title: "Harbor Robotics",
  //   description:
  //     "A launch site for a robotics startup's first product, built to explain hard hardware in plain, human language.",
  //   image: "https://picsum.photos/seed/harborrobotics/900/700",
  //   color: "#1f3d3d",
  //   tech: ["Next.js", "Framer Motion", "Three.js"],
  //   liveUrl: "#",
  //   repoUrl: "#",
  // },
];

// How many extra "card slots" of offset the stack keeps growing over
// before it flattens out (it gets clipped by the container anyway).
const MAX_STACK_DEPTH = 6;
const PEEK_STEP = 16; // px the stack shifts up per additional stacked card

function ProjectCard({ project, index, total, progress, stageHeight }) {
  // x is this card's own "local" scroll progress: it moves smoothly
  // through -1 (fully hidden below) -> 0 (fully active/front) -> 1+
  // (increasingly tucked into the stack) as the container scrolls.
  const x = useTransform(
    progress,
    (p) => Math.min(Math.max(p, 0), 1) * Math.max(total - 1, 0) - index,
  );

  const y = useTransform(
    x,
    [-1, 0, 1, 1 + MAX_STACK_DEPTH],
    [stageHeight, 0, -PEEK_STEP, -PEEK_STEP * (1 + MAX_STACK_DEPTH)],
  );

  const scale = useTransform(
    x,
    [-1, 0, 1, 1 + MAX_STACK_DEPTH],
    [0.92, 1, 0.97, 0.88],
  );

  const opacity = useTransform(x, [-1, -0.15, 0], [0, 1, 1]);

  return (
    <motion.article
      className="projects__card"
      style={{ y, scale, opacity, zIndex: index }}
    >
      <div
        className="projects__panel" 
        style={{ backgroundColor: project.color }}
      >
        <div className="projects__row">
          <span className="projects__category">{project.category}</span>
          <span className="projects__index">
            No. {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="projects__body">
          <h3 className="projects__title">{project.title}</h3>
          <p className="projects__desc">{project.description}</p>
        </div>

        {project.tech?.length > 0 && (
          <div className="projects__tech">
            <span className="projects__tech-label">Tech &amp; Tools</span>
            <ul className="projects__tech-list">
              {project.tech.map((t) => (
                <li key={t} className="projects__tech-pill">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="projects__actions">
          {project.liveUrl && (
            <a
              className="projects__btn projects__btn--primary"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>Live Project</span>
              <svg
                className="projects__btn-icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          )}
          {project.repoUrl && (
            <a
              className="projects__btn projects__btn--ghost"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="projects__btn-icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 6L3 12l5 6" />
                <path d="M16 6l5 6-5 6" />
              </svg>
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>

      <div className="projects__media">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>
    </motion.article>
  );
}

export default function Projects({
  projects = DEFAULT_PROJECTS,
  stageHeight = 620,
  className = "",
}) {
  const viewportRef = useRef(null);
  const total = projects.length;

  const { scrollYProgress } = useScroll({ container: viewportRef });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 38,
    mass: 0.4,
  });

  const goTo = (i) => {
    const el = viewportRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    el.scrollTo({
      top: (maxScroll * i) / Math.max(total - 1, 1),
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className={`projects ${className}`.trim()}>
      <div
        className="projects__viewport"
        ref={viewportRef}
        style={{ height: stageHeight }}
      >
        {/* Tall spacer that makes the container actually scrollable —
            one "page" of scroll per project. */}
        <div className="projects__track" style={{ height: `${total * 100}%` }}>
          <h2 className="projects__heading">Projects</h2>
          {/* Pinned stage: stays put while the track scrolls beneath it,
              and clips cards once they're pushed deep into the stack. */}
          <div className="projects__stage" style={{ height: stageHeight }}>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={total}
                progress={smoothProgress}
                stageHeight={stageHeight}
              />
            ))}
          </div>
        </div>
      </div>

      {total > 1 && (
        <div className="projects__dots">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="projects__dot"
              aria-label={`Scroll to project ${i + 1}: ${p.title}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}