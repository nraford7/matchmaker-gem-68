
import React from 'react';

const Partners = () => {
  return (
    <div className="space-y-6 mb-16">
      <p className="font-serif text-sm text-muted-foreground tracking-wider">Brought to you by:</p>
      <div className="flex gap-8 items-center">
        <img 
          src="/lovable-uploads/bc7f0867-82b2-4c0c-acb3-f2093e96736f.png" 
          alt="Sponsor 1" 
          className="h-8 opacity-75 transition-opacity hover:opacity-100" 
        />
        <img 
          src="/lovable-uploads/e33a00a9-24d5-4673-ab73-5b76d5d26d3d.png" 
          alt="Sponsor 2" 
          className="h-8 opacity-75 transition-opacity hover:opacity-100" 
        />
        <img 
          src="/lovable-uploads/1c565d4e-6fdd-4731-bb38-e49923afff82.png" 
          alt="EMIR" 
          className="h-8 opacity-75 transition-opacity hover:opacity-100" 
        />
      </div>
    </div>
  );
};

export default Partners;
