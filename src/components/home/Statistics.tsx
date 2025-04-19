
import React from 'react';

const statsData = [
  { value: "500+", label: "Active Deals" },
  { value: "98%", label: "Match Accuracy" },
  { value: "$2.4B", label: "Total Invested" },
  { value: "3,200+", label: "Investors" }
];

const Statistics = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-card border border-border rounded-xl p-8 w-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      {statsData.map((stat, index) => (
        <div key={index} className="transform transition-all duration-500 hover:scale-105">
          <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-numeric tracking-tight">
            {stat.value}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-serif tracking-wider">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
