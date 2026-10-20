// import React from 'react'
// import '../components/styles/skills.scss'

// const Skills = () => {
//   return (
//     <div className="skills" id="skills">
//       <h2>Technical Skills</h2>
//       <div class="card">
//         <span class="title">Programming Languages</span>
//         <div class="card__tags">
//           <ul class="tag">
//             <li class="tag__name">C</li>
//             <li class="tag__name">C++</li>
//             <li class="tag__name">Javascript</li>
//             <li class="tag__name">Python</li>
//             <li class="tag__name">Java</li>
//             <li class="tag__name">SQL</li>
//           </ul>
//         </div>
//       </div>

//       <div class="card">
//         <span class="title">Frontend</span>
//         <div class="card__tags">
//           <ul class="tag">
//             <li class="tag__name">HTML</li>
//             <li class="tag__name">CSS</li>
//             <li class="tag__name">SCSS</li>
//             <li class="tag__name">Taiwind css</li>
//             <li class="tag__name">JavaScript</li>
//             <li class="tag__name">React</li>
//             <li class="tag__name">Vite</li>
//           </ul>
//         </div>
//       </div>

//       <div class="card">
//         <span class="title">Backend</span>
//         <div class="card__tags">
//           <ul class="tag">
//             <li class="tag__name">Node.js</li>
//             <li class="tag__name">Express.js</li>
//             <li class="tag__name">Rest Api</li>
//             <li class="tag__name">MongoDB</li>
//             <li class="tag__name">Redis</li>
//             <li class="tag__name">Jwt</li>

//           </ul>
//         </div>
//       </div>

//       <div class="card">
//         <span class="title">Tools</span>
//         <div class="card__tags">
//           <ul class="tag">
//             <li class="tag__name">Git</li>
//             <li class="tag__name">Github</li>

//           </ul>
//         </div>
//       </div>

//       {/* <div class="card">
//         <span class="title">All tags</span>
//         <div class="card__tags">
//           <ul class="tag">
//             <li class="tag__name">JS</li>
//             <li class="tag__name">wordpress</li>
//             <li class="tag__name">uiverse</li>
//             <li class="tag__name">Css</li>
//             <li class="tag__name">html</li>
//             <li class="tag__name">go</li>
//             <li class="tag__name">java</li>
//             <li class="tag__name">ux/ui</li>
//             <li class="tag__name">figma</li>
//           </ul>
//         </div>
//       </div>  */}

//     </div>
//   );
// }

// export default Skills

import React from "react";
import "../components/styles/skills.scss";

const Skills = () => {
  return (
    <div className="skills" id="skills">
      <h2>Technical Skills</h2>

      <div className="card">
        <span className="title">Programming Languages</span>
        <div className="card__tags">
          <ul className="tag">
            <li className="tag__name">C</li>
            <li className="tag__name">C++</li>
            <li className="tag__name">JavaScript</li>
            <li className="tag__name">Python</li>
            <li className="tag__name">Java</li>
            <li className="tag__name">SQL</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <span className="title">Frontend</span>
        <div className="card__tags">
          <ul className="tag">
            <li className="tag__name">HTML</li>
            <li className="tag__name">CSS</li>
            <li className="tag__name">SCSS</li>
            <li className="tag__name">Tailwind CSS</li>
            <li className="tag__name">JavaScript</li>
            <li className="tag__name">React</li>
            <li className="tag__name">Vite</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <span className="title">Backend</span>
        <div className="card__tags">
          <ul className="tag">
            <li className="tag__name">Node.js</li>
            <li className="tag__name">Express.js</li>
            <li className="tag__name">REST API</li>
            <li className="tag__name">MongoDB</li>
            <li className="tag__name">Redis</li>
            <li className="tag__name">JWT</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <span className="title">Tools</span>
        <div className="card__tags">
          <ul className="tag">
            <li className="tag__name">Git</li>
            <li className="tag__name">GitHub</li>
          </ul>
        </div>
      </div>

      

    </div>
  );
};

export default Skills;