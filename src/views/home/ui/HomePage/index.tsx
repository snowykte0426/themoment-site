import CrewSection from '@/widgets/CrewSection';
import HeroSection from '@/widgets/HeroSection';
import IntroSection from '@/widgets/IntroSection';
import PhotosSection from '@/widgets/PhotosSection';
import ValuesSection from '@/widgets/ValuesSection';

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <ValuesSection />
      <PhotosSection />
      <CrewSection />
    </main>
  );
};

export default HomePage;
