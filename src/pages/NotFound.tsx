import { Container, PillLink } from "@/components/site/ui";
import { usePageMeta } from "@/lib/usePageMeta";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();
  usePageMeta(
    "Page not found | Garvata Labs",
    "The page you were looking for doesn't exist.",
    pathname,
  );

  return (
    <>
      <section className="pb-24 pt-40">
        <Container className="text-center">
          <p className="font-mono text-sm font-bold text-primary">404</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-gray-600">
            We couldn't find <span className="font-mono">{pathname}</span>. It
            may have moved.
          </p>
          <div className="mt-10 flex justify-center">
            <PillLink to="/">Back to home</PillLink>
          </div>
        </Container>
      </section>
    </>
  );
};

export default NotFound;
