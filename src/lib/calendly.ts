declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/kunal-garvata/30-minute-meeting";

// Calendly's widget is only fetched the first time someone asks to book.
export function openCalendly() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://assets.calendly.com/assets/external/widget.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.onload = () => {
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
  };
  document.body.appendChild(script);
}
