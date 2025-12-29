import AboutHero from './components/AboutHero';
import VisionMissionCoreValues from './components/VisionMissionCoreValues';
import Board from './components/Board';
import Members from './components/Members';
import StrategicAdvisors from './components/StrategicAdvisors';
import ContactFooter from '../../components/ContactFooter';
import Alliances from "./components/Alliances"

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <VisionMissionCoreValues />
      <Board />
      <Members />
      <StrategicAdvisors />
      <Alliances />
      <ContactFooter />
    </div>
  );
};

export default AboutUs;
