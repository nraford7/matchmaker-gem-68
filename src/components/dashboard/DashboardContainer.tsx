
import React from "react";

interface DashboardContainerProps {
  children: React.ReactNode;
}

export const DashboardContainer = ({ children }: DashboardContainerProps) => {
  return (
    <div className="container mx-auto pt-20 pb-16 relative z-10 max-w-6xl px-4 md:px-8 lg:px-16">
      {children}
    </div>
  );
};
