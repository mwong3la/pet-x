import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute top-0 left-0 right-0 h-20" />

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center pt-24">
        <div className="text-center mb-8">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 mb-12">
            Meet • Finstinct
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-white text-center mb-8 leading-[0.95] text-balance">
          Creation Without
          <br />
          Limitation
        </h1>

        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] ">
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black z-10 pointer-events-none" />
          <Image
            src="/sleek-black-smart-pet-collar-on-pure-black-backgro.jpg"
            alt="Finstinct Smart Collar"
            fill
            className="object-contain opacity-90"
            priority
          />
        </div>

        <div className="text-center mt-auto pb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Scroll to Reveal
          </p>
          <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
}
