
import { ReactNode } from "react";

type LandingFeatureCardProps = {
  icon: ReactNode;
  title: string;
  text: string;
  colorClass?: string;
};

const LandingFeatureCard = ({
  icon,
  title,
  text,
  colorClass = "bg-white",
}: LandingFeatureCardProps) => (
  <div className={`rounded-2xl p-6 shadow-glass bg-white/80 glass-morphism group transition hover:scale-105 hover:shadow-lg hover:bg-primary/10 duration-200 animate-fade-in-up`}>
    <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${colorClass}`}>
      {icon}
    </div>
    <h3 className="font-semibold text-xl mb-2 text-gray-800 group-hover:text-primary">{title}</h3>
    <p className="text-gray-600 leading-snug">{text}</p>
  </div>
);

export default LandingFeatureCard;
