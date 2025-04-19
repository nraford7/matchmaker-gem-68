
import React from 'react';
import FeatureCard from './FeatureCard';

const featuresData = [
  {
    title: "Confidential, Invite-Only",
    description: "Our exclusive platform ensures that sensitive investment opportunities remain private and are only shared with qualified investors.",
    features: [
      "Invitation-only access to top-tier deals",
      "End-to-end encryption for sensitive materials",
      "Verified investor network with NDA protection"
    ]
  },
  {
    title: "Deep Understanding",
    description: "The Guild's AI builds a comprehensive model of your investment strategy and preferences to find exactly what you're looking for.",
    features: [
      "Intuitive preference profile building",
      "Contextual understanding of investment goals",
      "Continuous learning from your feedback"
    ]
  },
  {
    title: "Exclusive Deals",
    description: "Access proprietary investment opportunities not available anywhere else, carefully curated for our elite membership.",
    features: [
      "Pre-market access to high-value opportunities",
      "Exclusive founder meetings and deal terms",
      "Priority allocation in oversubscribed rounds"
    ]
  }
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {featuresData.map((feature, index) => (
        <FeatureCard 
          key={index}
          title={feature.title}
          description={feature.description}
          features={feature.features}
        />
      ))}
    </div>
  );
};

export default Features;
