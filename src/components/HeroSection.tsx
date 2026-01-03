
const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541963463532-d68292c34d19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Clean water flowing in nature" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70"></div>
      </div>
      <div className="container mx-auto px-4 py-20 md:py-32 flex items-center min-h-screen relative z-10">
        <div className="flex justify-center w-full">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-2xl mb-8">
              Bring clean and safe water to every person on the planet
            </h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-xl mb-8">
              Join us in ending the water crisis in our lifetime. Every donation brings clean water to communities in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full hover:bg-yellow-300 transition-colors">
                DONATE NOW
              </button>
              <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 text-sm font-bold rounded-full hover:bg-gray-900 hover:text-white transition-colors">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
