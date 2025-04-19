
import React from 'react';
import { ChevronRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
}

const FeatureCard = ({ title, description, features }: FeatureCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      <h3 className="text-2xl font-semibold text-foreground font-serif tracking-wide mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6 text-base font-serif leading-relaxed">
        {description}
      </p>
      <ul className="space-y-3 font-serif">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <ChevronRight className="h-4 w-4 text-crimson flex-shrink-0" />
            <span className="text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
