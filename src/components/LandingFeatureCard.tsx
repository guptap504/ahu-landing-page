
import { ReactNode } from "react";

type LandingFeatureCardProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

const LandingFeatureCard = ({
  icon,
  title,
  text,
}: LandingFeatureCardProps) => (
  <div>
    <div className="mb-3">{icon}</div>
    <h3 className="font-serif font-semibold text-lg text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </div>
);

export default LandingFeatureCard;
