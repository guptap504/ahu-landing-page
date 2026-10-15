import { lazy, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import SiteLayout from "./components/site/SiteLayout";
import Index from "./pages/Index";

// Secondary routes are split out so the landing page loads only its own code,
// then prefetched once the browser is idle so later navigation is instant.
const routeLoaders = {
  solutions: () => import("./pages/Solutions"),
  products: () => import("./pages/Products"),
  calculate: () => import("./pages/Calculate"),
  demo: () => import("./pages/Demo"),
  blog: () => import("./pages/Blog"),
  blogPost: () => import("./pages/BlogPost"),
  contact: () => import("./pages/Contact"),
  privacy: () => import("./pages/Privacy"),
  notFound: () => import("./pages/NotFound"),
};
const Solutions = lazy(routeLoaders.solutions);
const Products = lazy(routeLoaders.products);
const Calculate = lazy(routeLoaders.calculate);
const Demo = lazy(routeLoaders.demo);
const Blog = lazy(routeLoaders.blog);
const BlogPost = lazy(routeLoaders.blogPost);
const Contact = lazy(routeLoaders.contact);
const Privacy = lazy(routeLoaders.privacy);
const NotFound = lazy(routeLoaders.notFound);

function usePrefetchRoutes() {
  useEffect(() => {
    const prefetch = () => {
      for (const load of Object.values(routeLoaders)) load().catch(() => {});
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetch, 2000);
    return () => clearTimeout(id);
  }, []);
}

// Start each new page at the top, or at its #section when the link has one.
// Links can opt out with `state={{ keepScroll: true }}` (e.g. solution tabs).
// Lazy pages may not have rendered yet, so retry for a short while.
function ScrollManager() {
  const { pathname, hash, state } = useLocation();
  const keepScroll = (state as { keepScroll?: boolean } | null)?.keepScroll;

  useEffect(() => {
    if (keepScroll) return;
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    let frame = 0;
    let attempts = 0;
    const scrollToHash = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
      } else if (attempts++ < 60) {
        frame = requestAnimationFrame(scrollToHash);
      }
    };
    scrollToHash();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, keepScroll]);

  return null;
}

const App = () => {
  usePrefetchRoutes();

  return (
    <>
      {/* v7_startTransition keeps the current page on screen while the next
          one loads, instead of flashing the Suspense fallback. */}
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ScrollManager />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Index />} />
            <Route
              path="solutions"
              element={<Navigate to="/solutions/data-centers" replace />}
            />
            <Route path="solutions/:industry" element={<Solutions />} />
            <Route path="products" element={<Products />} />
            <Route path="calculate" element={<Calculate />} />
            <Route path="demo" element={<Demo />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" theme="light" />
    </>
  );
};

export default App;
