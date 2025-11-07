import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Laboratory_hero_image_920b5f7e.png";

export default function Hero() {
  const handleGetStarted = () => {
    console.log("Get Started clicked");
  };

  const handleLearnMore = () => {
    console.log("Learn More clicked");
  };

  return (
    <section className="relative h-[90vh] lg:h-[70vh] min-h-[500px] flex items-center">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Advanced Laboratory
            <span className="text-primary-foreground"> Solutions</span>
          </h1>
          <p className="text-md md:text-xl text-gray-200 mb-8 leading-relaxed">
            Trusted provider of high-performance chromatography columns,
            laboratory instruments, and consumables for pharmaceutical,
            biotechnology, and research institutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="">
              <a
                href={`https://wa.me/919810756453?text=${encodeURI(
                  "Hello Utech Life team, I am interested in learning more and getting started with your solutions."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-quote"
              >
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="text-base px-8"
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
              </a>
            </div>

            {/* <Button
              variant="outline"
              size="lg"
              onClick={handleLearnMore}
              className="text-base px-8 bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20"
              data-testid="button-learn-more"
            >
              Learn More
            </Button> */}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="absolute bottom-3 lg;bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 lg:gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Noida, India</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Trusted by 500+ Labs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
