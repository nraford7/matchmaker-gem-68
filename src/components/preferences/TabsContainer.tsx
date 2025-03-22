
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileForm } from "./ProfileForm";
import { SectorsForm } from "./SectorsForm";
import { StagesForm } from "./StagesForm";
import { CheckSizeForm } from "./CheckSizeForm";
import { GeographyForm } from "./GeographyForm";
import { AccountSettingsForm } from "./AccountSettingsForm";

export const TabsContainer = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="sectors">Sectors</TabsTrigger>
        <TabsTrigger value="stages">Investment Stages</TabsTrigger>
        <TabsTrigger value="checks">Check Size</TabsTrigger>
        <TabsTrigger value="geo">Geography</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="space-y-4">
        <ProfileForm />
      </TabsContent>
      
      <TabsContent value="sectors" className="space-y-4">
        <SectorsForm />
      </TabsContent>
      
      <TabsContent value="stages" className="space-y-4">
        <StagesForm />
      </TabsContent>
      
      <TabsContent value="checks" className="space-y-4">
        <CheckSizeForm />
      </TabsContent>
      
      <TabsContent value="geo" className="space-y-4">
        <GeographyForm />
      </TabsContent>
      
      <TabsContent value="account" className="space-y-4">
        <AccountSettingsForm />
      </TabsContent>
    </Tabs>
  );
};
