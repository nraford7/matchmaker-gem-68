
import React from 'react';
import { Card } from '@/components/ui/card';
import { PageTitle } from '@/components/PageTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { TabsContainer } from '@/components/preferences/TabsContainer';
import { Investor } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

const profileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  company: z.string().optional(),
  preferred_stages: z.array(z.string()).optional(),
  preferred_geographies: z.array(z.string()).optional(),
  check_size_min: z.number().optional(),
  check_size_max: z.number().optional(),
  investment_thesis: z.string().optional(),
  deal_count: z.number().optional(),
});

const PreferencesPage = () => {
  const { investorProfile } = useAuth();
  
  const form = useForm<Investor>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: investorProfile?.id || '',
      name: investorProfile?.name || '',
      email: investorProfile?.email || '',
      company: investorProfile?.company || '',
      preferred_stages: investorProfile?.preferred_stages || [],
      preferred_geographies: investorProfile?.preferred_geographies || [],
      check_size_min: investorProfile?.check_size_min || 0,
      check_size_max: investorProfile?.check_size_max || 0,
      investment_thesis: investorProfile?.investment_thesis || '',
      deal_count: investorProfile?.deal_count || 0,
      sector_tags: investorProfile?.sector_tags || []
    },
  });

  return (
    <div className="container mx-auto py-8">
      <PageTitle
        title="Investor Preferences"
        subtitle="Customize your investment preferences and profile"
      />
      
      <div className="mt-8">
        <Card className="p-6">
          <FormProvider {...form}>
            <TabsContainer />
          </FormProvider>
        </Card>
      </div>
    </div>
  );
};

export default PreferencesPage;
