
export const PersonalIntro = () => {
  return (
    <section className="py-12 border-b border-gray-100">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
        <div className="order-2 md:order-1 flex-1">
          <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-4 leading-tight">
            Ideas at the intersection of technology, health, and human progress
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
            I write about emerging technologies, global health challenges, climate solutions, 
            and the systems that shape our world. Currently exploring how AI can accelerate 
            progress in healthcare and education.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-6 text-sm text-muted-foreground">
            <span>Currently in San Francisco</span>
            <span className="hidden sm:inline">•</span>
            <span>Updated 2 hours ago</span>
          </div>
        </div>
        <div className="order-1 md:order-2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mb-4 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
            alt="Shubham Dixena"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
