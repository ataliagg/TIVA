import HeroSection from '../components/home/HeroSection';
import ServiceCategories from '../components/home/ServiceCategories';
import FeaturedWorkers from '../components/home/FeaturedWorkers';
import HowItWorks from '../components/home/HowItWorks';
import TrustSection from '../components/home/TrustSection';
import ReviewsSection from '../components/home/ReviewsSection';
import WorkerCTA from '../components/home/WorkerCTA';
import FAQSection from '../components/home/FAQSection';
import './Home.css';
export default function Home() {
  return (
    <div className="home-page container">
      <HeroSection />
      <ServiceCategories />
      <FeaturedWorkers />
      <HowItWorks />
      <TrustSection />
      <ReviewsSection />
      <WorkerCTA />
      <FAQSection />
    </div>
  );
}
