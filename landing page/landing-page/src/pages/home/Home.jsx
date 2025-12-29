import Hero from './components/Hero';
import WelcomeIntro from './components/WelcomeIntro';
import SubscribePlans from './components/SubscribePlans';
import LiveAuction from './components/LiveAuction';
import VisionMission from './components/VisionMission';
import CoreValues from './components/CoreValues';
import ContactFooter from '../../components/ContactFooter';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WelcomeIntro />
      <SubscribePlans />
      <LiveAuction />
      <VisionMission />
      <CoreValues />
      <ContactFooter />
    </div>
  );
};

export default Home;
