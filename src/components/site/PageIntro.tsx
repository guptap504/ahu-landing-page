import type { ReactNode } from "react";
import { Container } from "./ui";

// Light, centred page header used by the Solutions and Products pages.
export default function PageIntro({
  title,
  accent,
  description,
  children,
}: {
  title: string;
  accent: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="pb-12 pt-36 sm:pb-16 sm:pt-44">
      <Container className="text-center">
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
          <span className="block text-gray-900">{title}</span>
          <span className="block text-primary">{accent}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          {description}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
