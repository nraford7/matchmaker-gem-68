
import React, { useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { SearchBar } from '@/components/SearchBar';
import { OpportunityList } from '@/components/opportunities';
import { Deal } from '@/types';
import { mockDeals } from '@/data/mockData'; // Changed from mockOpportunities to mockDeals

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(mockDeals);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredDeals(mockDeals);
      return;
    }
    
    const filtered = mockDeals.filter(deal => 
      deal.name.toLowerCase().includes(query.toLowerCase()) ||
      deal.description?.toLowerCase().includes(query.toLowerCase()) ||
      deal.stage?.toLowerCase().includes(query.toLowerCase()) ||
      (deal.sector_tags && deal.sector_tags.some(tag => 
        tag.toLowerCase().includes(query.toLowerCase()))
      )
    );
    
    setFilteredDeals(filtered);
  };

  return (
    <div className="container mx-auto py-8">
      <PageTitle title="Browse Opportunities" subtitle="Discover new investment opportunities" />
      
      <div className="mb-8">
        <SearchBar 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name, description, stage, or sector"
          className="w-full"
        />
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Opportunities</h2>
        <OpportunityList opportunities={filteredDeals} />
      </div>
    </div>
  );
};

export default Browse;
