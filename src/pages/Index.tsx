
import React from 'react';
import Hero from '@/components/home/Hero';
import Partners from '@/components/home/Partners';
import Features from '@/components/home/Features';
import Statistics from '@/components/home/Statistics';

const Index = () => {
  return (
    <div className="relative bg-background min-h-screen pt-20">
      <div className="container mx-auto px-16 md:px-24 py-20 relative z-10">
        <div className="animate-fade-in">
          <Hero />
          <Partners />
          <div className="border-t border-border pt-6 mb-8"></div>
          <Features />
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default Index;
