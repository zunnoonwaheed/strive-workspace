import ChatButton from './components/ChatButton';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Features from './components/Features';
import Workspaces from './components/Workspaces';
import FindSpace from './components/FindSpace';
import PrimeDesk from './components/PrimeDesk';
import Solutions from './components/Solutions';
import WorkspaceTypes from './components/WorkspaceTypes';
import Advantages from './components/Advantages';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <>
      <ChatButton />
      <div className="page-container">
        <Hero />
        <StatsBar />
        <Features />
        <Workspaces />
        <FindSpace />
        <PrimeDesk />
        <Solutions />
        <WorkspaceTypes />
        <Advantages />
        <Testimonials />
        <FAQ />
        <Contact />
      </div>
    </>
  );
}

export default App;
