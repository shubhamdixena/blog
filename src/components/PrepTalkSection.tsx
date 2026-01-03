const PrepTalkSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="order-2 md:order-1">
            <div className="bg-[#F1F1F1] px-3 py-2 rounded-md inline-block mb-4 md:mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600">SPOTLIGHT PROJECT</span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6 leading-tight text-slate-900 font-semibold">
              Mentoring hundreds on their journey to scholarships
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Mentoring hundreds on their journey to scholarships, global degrees, or finding their mission in life has become my biggest focus. The real highlight is always a simple message from someone who got in and now wants to give back.
            </p>
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Innovation in medical technology and drug delivery systems" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <button className="absolute right-3 top-3 sm:right-5 sm:top-5 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-2.5 shadow-md hover:bg-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Watch: Revolutionary Drug Delivery Innovation</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative h-full w-full rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Healthcare researcher working on innovative solutions" 
                className="w-full h-full object-cover min-h-[400px] md:min-h-[600px]"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              <div className="relative mt-4 p-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg sm:absolute sm:bottom-4 sm:left-4 md:bottom-8 md:left-8 sm:p-5 md:p-7 sm:max-w-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                  MENTORSHIP IN ACTION
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-tight">
                  Breaking barriers, one student at a time
                </h3>
                <p className="text-base text-slate-600">
                  Last year, I worked with students who felt totally lost with applications. Seeing their breakthrough moments, or even helping them push through setbacks, is what keeps me fired up to keep going.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrepTalkSection;
