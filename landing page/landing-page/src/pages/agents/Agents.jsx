import { Link } from 'react-router-dom';
import { UserCheck, ArrowRight } from 'lucide-react';
import RegularUser from "../../components/subscription-tiers/RegularUser"
import SilverUser from '../../components/subscription-tiers/SilverUser';
import GoldUser from '../../components/subscription-tiers/GoldUser';
import ContactFooter from '../../components/ContactFooter';
import ComprehensiveUser from '../../components/subscription-tiers/ComparativeSection';
import SubscriptionPlans from '../../components/subscription-tiers/SubscriptionPlans';
import AgentsHero from './components/AgentsHero';
import PlatinumUser1 from '../../components/subscription-tiers/PlatinumUser-1';
import PlatinumUser2 from '../../components/subscription-tiers/PlatinumUser-2';


const Agents = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <AgentsHero />
      <SubscriptionPlans />
     <RegularUser />
     <SilverUser/>
     <GoldUser/>
     <PlatinumUser1/>
     <PlatinumUser2/>
     <ComprehensiveUser/>
     <ContactFooter/>

    </div>
  );
};

export default Agents;

