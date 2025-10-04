import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import ProductPortfolio from '@/components/ProductPortfolio';
import Industries from '@/components/Industries';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <ProductPortfolio />
        <Industries />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
}