"use client";

import { useState } from "react";
import { btnPrimary } from "@/lib/ui";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("company") ?? ""); // spam trap

    // Client-side validation
    const errors: Record<string, string> = {};
    if (!name) errors.name = "Please enter your name.";
    if (!email) errors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email))
      errors.email = "Please enter a valid email.";
    if (!message) errors.message = "Please enter a message.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company: honeypot }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error || "Something went wrong. Please try again.",
        );
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="mt-4 rounded-xl border border-brand-green bg-brand-green-light p-6 text-brand-green-dark"
      >
        <p className="font-semibold">Thank you — your message has been sent.</p>
        <p className="mt-1 text-sm">We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 space-y-5">
      <Field
        id="name"
        label="Name"
        error={fieldErrors.name}
        autoComplete="name"
        required
      />
      <Field
        id="email"
        label="Email"
        type="email"
        error={fieldErrors.email}
        autoComplete="email"
        required
      />
      <div>
        <label
          htmlFor="message"
          className="block font-semibold text-brand-black"
        >
          Message{" "}
          <span aria-hidden className="text-brand-red">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-brand-green"
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1 text-sm text-brand-red">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from users, catches bots */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-brand-red-dark"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={btnPrimary}
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  error,
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-brand-black">
        {label}{" "}
        {required && (
          <span aria-hidden className="text-brand-red">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        aria-required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-brand-green"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-brand-red">
          {error}
        </p>
      )}
    </div>
  );
}
