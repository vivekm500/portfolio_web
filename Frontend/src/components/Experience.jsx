// import React from 'react'
// import '../components/styles/experience.scss'

// const Experience = () => {
//   return (
//     <div className="experiences" id="experience">
//       <h2>Experience</h2>
//       <div className="experience">
//         <div className="upper">
//           <h4>Intellio Intern</h4>
//           <h6>Mar 2026 - May 2026</h6>
//           <button>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
//             </svg>
//           </button>
//         </div>
//         <h6>Full Stack MERN Developer Intern</h6>
//         <p>
//           • Completed a comprehensive 6-week internship in MERN Development.{" "}
//           <br />
//           • Gained practical exposure to full-stack web development and MERN
//           application development. <br />• Developed RESTful APIs using Node.js
//           and Express.js for full-stack MERN applications.
//         </p>
//       </div>

//       <div className="experience">
//         <div className="upper">
//           <h4>Edunet Foundation</h4>
//           <h6>Jun 2025 – Jul 2025</h6>
//           <button>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
//             </svg>
//           </button>
//         </div>
//         <h6>AI Azure Intern</h6>
//         <p>
//           • Completed a 4-week internship on AI Azure through a Microsoft
//           initiative implemented by Edunet Foundation in collaboration with
//           AICTE. <br />
//          • Gained exposure to Azure-based AI technologies and cloud
//           computing concepts
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Experience

import React, { useState } from "react";
import "../components/styles/experience.scss";

const EXPERIENCES = [
  {
    id: "intellio",
    company: "Intellio Intern",
    date: "Mar 2026 - May 2026",
    role: "Full Stack MERN Developer Intern",
    points: [
      "Completed a comprehensive 6-week internship in MERN Development.",
      "Gained practical exposure to full-stack web development and MERN application development.",
      "Developed RESTful APIs using Node.js and Express.js for full-stack MERN applications.",
    ],
  },
  {
    id: "edunet",
    company: "Edunet Foundation",
    date: "Jun 2025 – Jul 2025",
    role: "AI Azure Intern",
    points: [
      "Completed a 4-week internship on AI Azure through a Microsoft initiative implemented by Edunet Foundation in collaboration with AICTE.",
      "Gained exposure to Azure-based AI technologies and cloud computing concepts.",
    ],
  },
];

const ExperienceCard = ({ exp }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`experience${open ? " is-open" : ""}`}>
      <div className="upper">
        <h4>{exp.company}</h4>

        <div className="meta">
          <span className="date">{exp.date}</span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={`exp-details-${exp.id}`}
            aria-label={open ? "Collapse details" : "Expand details"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
            </svg>
          </button>
        </div>
      </div>

      <h6 className="role">{exp.role}</h6>

      <div className="details" id={`exp-details-${exp.id}`}>
        <ul className="points">
          {exp.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <div className="experiences" id="experience">
      <h2>Experience</h2>

      {EXPERIENCES.map((exp) => (
        <ExperienceCard key={exp.id} exp={exp} />
      ))}
    </div>
  );
};

export default Experience;