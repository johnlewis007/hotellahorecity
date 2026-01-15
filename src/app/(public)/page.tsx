import Hero from '@/components/home/Hero';
import Highlights from '@/components/home/Highlights';
import FeaturedRooms from '@/components/home/FeaturedRooms';
import Reviews from '@/components/home/Reviews';

export default function Home() {
  return (
    <main>
      <Hero />
      <Highlights />
      <FeaturedRooms />
      <Reviews />
    </main>
  );
}
