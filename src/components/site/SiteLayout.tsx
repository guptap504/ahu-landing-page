import { ArrowUp } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ContactBand from "./ContactBand";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

// Layout route: the header and footer stay mounted across navigation and
// only the page content inside <main> changes.
export default function SiteLayout() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();
  // Re-run the entry fade per page, but not when switching Solutions tabs.
  const section = pathname.split("/")[1];

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white font-sans text-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-gray-900 focus:shadow-lg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen" />}>
          <div key={section} className="animate-page-in">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <ContactBand />
      <SiteFooter />
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-md hover:bg-navy-700"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
