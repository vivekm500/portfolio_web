import { useState } from "react";
import { ArrowUpRight, Check, Loader2, Send } from "lucide-react";

import "../components/styles/contact.scss";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "The contact form is not configured correctly. Please email me directly.",
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const formElement = event.currentTarget;
      const formData = new FormData(formElement);

      formData.set("access_key", accessKey);
      formData.set("from_name", "Portfolio Contact Form");
      formData.set("subject", `Portfolio Contact: ${form.subject.trim()}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Your message could not be sent. Please try again.",
        );
      }

      setForm(INITIAL_FORM);
      setStatus("success");
      formElement.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setStatus("error");
      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again or email me directly.",
      );
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* LEFT SIDE */}

        <div className="contact-intro">
          <div className="contact-eyebrow-row">
            <span className="contact-eyebrow">GET IN TOUCH</span>

            <span className="contact-eyebrow-line" />
          </div>

          <h2 className="contact-title">
            Let's build
            <br />
            <span>something.</span>
          </h2>

          <p className="contact-description">
            Have an idea, an opportunity, or just want to talk about technology?
            <br />
            Send me a message.
          </p>

          <div className="contact-direct">
            <span>Prefer email?</span>

            <a href="mailto:vivekkumar82017@gmail.com">
              Send a Mail
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE — CONTACT FORM */}

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot for basic spam filtering */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="contact-honeypot"
            />

            {/* NAME */}

            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>

              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                minLength={2}
                maxLength={80}
                required
              />
            </div>

            {/* EMAIL */}

            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>

              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>

            {/* SUBJECT */}

            <div className="contact-field">
              <label htmlFor="contact-subject">Subject</label>

              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                minLength={3}
                maxLength={120}
                required
              />
            </div>

            {/* MESSAGE */}

            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>

              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your idea, opportunity, or project..."
                rows={6}
                minLength={10}
                maxLength={5000}
                required
              />
            </div>

            {/* SUCCESS MESSAGE */}

            {status === "success" && (
              <div
                className="contact-status contact-status-success"
                role="status"
                aria-live="polite"
              >
                <span className="contact-status-icon">
                  <Check size={15} />
                </span>

                <span>
                  Message sent successfully! I'll get back to you soon.
                </span>
              </div>
            )}

            {/* ERROR MESSAGE */}

            {status === "error" && (
              <div className="contact-status contact-status-error" role="alert">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="contact-submit"
              disabled={status === "sending"}
            >
              <span className="contact-submit-text">
                {status === "sending" && (
                  <>
                    Sending
                    <Loader2 size={16} className="contact-spinner" />
                  </>
                )}

                {status === "idle" && (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}

                {status === "success" && (
                  <>
                    Sent
                    <Check size={16} />
                  </>
                )}

                {status === "error" && (
                  <>
                    Try Again
                    <Send size={16} />
                  </>
                )}
              </span>

              <span className="contact-submit-arrow">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}

      <div className="contact-footer">
        <span>Vivek Kumar</span>
        <span>Available for opportunities</span>
        <span>© {new Date().getFullYear()}</span>
        {/* <span>Developed By Vivek Kumar</span> */}
      </div>
    </section>
  );
}
