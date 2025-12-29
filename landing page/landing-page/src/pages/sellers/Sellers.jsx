import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import RegularUser from "../../components/subscription-tiers/RegularUser"
import SilverUser from '../../components/subscription-tiers/SilverUser';
import GoldUser from '../../components/subscription-tiers/GoldUser';
import ContactFooter from '../../components/ContactFooter';
import ComprehensiveUser from '../../components/subscription-tiers/ComparativeSection';
import SubscriptionPlans from '../../components/subscription-tiers/SubscriptionPlans';
import SellersHero from './components/SellersHero';

const Sellers = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <SellersHero />
      <SubscriptionPlans />
     <RegularUser />
     <SilverUser/>
     <GoldUser/>
     <ComprehensiveUser/>
     <ContactFooter/>

    </div>
    </div>
  );
};

export default Sellers;

