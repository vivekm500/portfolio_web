import React from "react";
import styled from "styled-components";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SocialCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        {/* Mail */}
        <a
          className="social-link1"
          href="mailto:yourmail@example.com"
          aria-label="Email"
        >
          <Mail />
        </a>

        {/* Phone */}
        <a className="social-link2" href="tel:+919608430346" aria-label="Call">
          <Phone />
        </a>

        {/* GitHub */}
        <a
          className="social-link3"
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>

        {/* LinkedIn */}
        <a
          className="social-link4"
          href="https://www.linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    display: flex;
    height: 70px;
    width: 270px;
  }

  .card .social-link1,
  .card .social-link2,
  .card .social-link3,
  .card .social-link4 {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 25%;

    color: whitesmoke;
    font-size: 24px;

    text-decoration: none;

    transition: 0.25s;
    border-radius: 50px;
  }

  .card svg {
    width: 24px;
    height: 24px;

    z-index: 2;

    transition: transform 0.25s ease;
  }

  /* Mail */
  .card .social-link1:hover {
    background-color: #ea4335;
    animation: bounce_613 0.4s linear;
  }

  /* Phone */
  .card .social-link2:hover {
    background-color: #22c55e;
    animation: bounce_613 0.4s linear;
  }

  /* GitHub */
  .card .social-link3:hover {
    background-color: #1a1e22;
    animation: bounce_613 0.4s linear;
  }

  /* LinkedIn */
  .card .social-link4:hover {
    background-color: #0a66c2;
    animation: bounce_613 0.4s linear;
  }

  @keyframes bounce_613 {
    40% {
      transform: scale(1.4);
    }

    60% {
      transform: scale(0.8);
    }

    80% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }
`;

export default SocialCard;
