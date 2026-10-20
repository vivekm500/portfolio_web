import React, { useEffect, useRef, useState } from "react";
import "../components/styles/nav.scss";

// Same links as before, in the same order.
// To bring About back, add: { id: "about", label: "About" }
const LINKS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);

  // Scroll state: shadow/background change, page progress line, and
  // which section is currently "active" in the nav.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 20);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);

      // Active section = the one whose top edge is closest to (but above)
      // a line 40% down the screen. Works whatever order the sections are
      // in on the page.
      const threshold = window.innerHeight * 0.4;
      let current = "home";
      let bestTop = -Infinity;

      LINKS.forEach(({ id }) => {
        if (id === "home") return;
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold && top > bestTop) {
          bestTop = top;
          current = id;
        }
      });

      // At the very bottom of the page, highlight the last section (Contact)
      if (max > 0 && y >= max - 4 && document.getElementById("contact")) {
        current = "contact";
      }

      setActive(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close the mobile menu with Escape or by clicking outside the navbar
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  // Smooth-scroll to a section (falls back to the normal anchor jump if
  // no element with that id exists)
  const handleNavClick = (e, id) => {
    setMenuOpen(false);

    if (id === "home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`navbar${scrolled ? " is-scrolled" : ""}`}
      aria-label="Main navigation"
    >
      <a
        href="#home"
        className="logo"
        aria-label="Vivek Kumar — home"
        onClick={(e) => handleNavClick(e, "home")}
      >
        <span className="logo__mark">VK</span>
      </a>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-link${active === id ? " active" : ""}`}
            aria-current={active === id ? "page" : undefined}
            onClick={(e) => handleNavClick(e, id)}
          >
            {label}
          </a>
        ))}
      </div>

      <button
        type="button"
        className={`menu-btn${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span className="menu-btn__bar" />
        <span className="menu-btn__bar" />
        <span className="menu-btn__bar" />
      </button>

      {/* thin page-scroll progress line along the bottom edge */}
      <span className="nav-progress" aria-hidden="true">
        <span
          className="nav-progress__bar"
          style={{ transform: `scaleX(${progress})` }}
        />
      </span>
    </nav>
  );
};

export default Navbar;
