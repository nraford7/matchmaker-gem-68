
import React from "react";

interface DashboardContainerProps {
  children: React.ReactNode;
}

export const DashboardContainer = ({ children }: DashboardContainerProps) => {
  return (
    <div className="container mx-auto py-6">
      {children}
    </div>
  );
};
