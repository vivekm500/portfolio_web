import React from "react";
import "../pages/style/home.scss";
import Navbar from "../components/Navbar";
import SocialCard from "../components/styles/Socialcard";
import { ArrowDownIcon, ArrowRight, ArrowUpRight } from "lucide-react";
import Projects from "../components/Projects";

import FramerAnimation from "../components/FramerAnimation";

import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

// Import the image (instead of a "../src/assets/..." string path) so it
// also works in production builds, not just the dev server.
import profileImg from "../assets/photo_vk-removebg-preview.png";

// Smoothly scrolls to a section if an element with that id exists on the page.
const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const Home = () => {
  return (
    /* 1. Relative position container handling the main portfolio bounding block boundaries */
    <main
      className="home-page"
      id="home"
      style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}
    >
      {/* 
        2. CONTENT LAYER HOOK: 
        - position: 'relative' and zIndex: 1 forces your profile elements to stay ABOVE the moving gradient.
        - pointerEvents: 'none' passes your cursor coordinates straight through the white space down to the shader.
      */}
      <div style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
        {/* 3. RESTORE CLICKABILITY: Every major layout block uses pointerEvents: 'auto' so buttons remain interactive */}
        <div style={{ pointerEvents: "auto" }}>
          <Navbar />
        </div>

        <div className="home" style={{ pointerEvents: "auto" }}>
          <FramerAnimation
            backgroundColor="#1c1917"
            dotColor="#f0d9a8"
            dotSize={5}
            spacing={65}
            proximityRadius={180}
            maxOpacity={0.8}
            backgroundOpacity={0.08}
            gridType="dots"
          />

          <div className="left">
            <div className="text">
              <h1>
                Hi, I'm <span className="name">Vivek Kumar</span>
              </h1>
              <h2>Full Stack Developer</h2>
              <p>
                I'm a passionate{" "}
                <span className="hl hl--gold">Full Stack Developer</span> with
                expertise in building dynamic web applications. I have a
                strong foundation in both{" "}
                <span className="hl hl--gold">front-end</span> and{" "}
                <span className="hl hl--gold">back-end</span> development,
                allowing me to create seamless user experiences and efficient
                server-side solutions.
              </p>
            </div>

            <div className="btn1">
              {/* Add href / onClick here to point at your resume PDF */}
              {/* <button type="button" className="btn btn--primary">
                <span>Resume</span>
                <ArrowDownIcon
                  className="btn__icon btn__icon--down"
                  size={18}
                />
              </button> */}

              <a
                href="https://drive.google.com/file/d/13egGfGRVP_2on5_bV3P4kB-gIYYq-Ufg/view?usp=drivesdk"
                // download="Vivek_Kumar_Resume.pdf"
                target="_blank"
                className="btn btn--primary"
              >
                <span>Resume</span>
                <ArrowDownIcon
                  className="btn__icon btn__icon--down"
                  size={18}
                />
              </a>

              <button
                type="button"
                className="btn btn--outline"
                onClick={() => scrollToSection("projects")}
              >
                <span>Projects</span>
                <ArrowRight className="btn__icon btn__icon--right" size={18} />
              </button>

              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => scrollToSection("contact")}
              >
                <span>Contact</span>
                <ArrowUpRight className="btn__icon btn__icon--diag" size={18} />
              </button>
            </div>

            <div className="btn2">
              <SocialCard />
            </div>
          </div>

          <div className="right">
            <div className="right-container">
              <div className="image">
                <span className="status">
                  <span className="status__dot" />
                  Available for work
                </span>
                <img src={profileImg} alt="profile image" />
              </div>

              <div className="desc">
                <div className="desc1">
                  <h4>Vivek Kumar</h4>
                  <h6>Software Engineer</h6>
                  <p>
                    Open to internships, software engineering roles, and focused
                    technical collaborations.
                  </p>
                </div>

                <div className="desc2">
                  <h6>EDUCATION</h6>
                  <h4>BPMCE (BEU)</h4>
                  <p>B.Tech CSE Undergrad (2023–2027) · CGR 7.78</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <Projects />
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <Experience />

          <Skills />

          <Contact />
        </div>
      </div>
    </main>
  );
};

export default Home;
