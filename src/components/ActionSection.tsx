
const ActionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
          Ready to make a difference?
        </h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Join thousands of people who are helping bring clean water to communities around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full hover:bg-yellow-300 transition-colors">
            DONATE NOW
          </button>
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 text-sm font-bold rounded-full hover:bg-gray-900 hover:text-white transition-colors">
            START FUNDRAISING
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;
