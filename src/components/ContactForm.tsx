import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setIsSubmitted(true);
      reset();
      toast.success("Message sent — we'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-serif font-bold text-gray-900 mb-2">
          Thanks for reaching out.
        </p>
        <p className="text-gray-600 mb-6">
          We'll get back to you within one business day.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto text-left space-y-4"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          {...register("name")}
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          {...register("email")}
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          placeholder="you@company.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-company"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company
        </label>
        <input
          id="contact-company"
          type="text"
          {...register("company")}
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          placeholder="Your company"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          {...register("message")}
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
          placeholder="Tell us about your building and what you're looking for"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white font-semibold rounded-lg px-8 py-3.5 min-h-[44px] hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>

      <p className="text-center text-xs text-gray-400 pt-1">
        Or email us directly at{" "}
        <a
          href="mailto:hello@garvata.com"
          className="text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <Mail className="w-3 h-3" />
          hello@garvata.com
        </a>
      </p>
    </form>
  );
}
