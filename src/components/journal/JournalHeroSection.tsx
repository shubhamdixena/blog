const JournalHeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Side */}
          <div className="order-1 lg:order-1 flex justify-center">
            <div className="w-96 h-96 lg:w-[450px] lg:h-[450px] overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
              <img 
                src="https://i.postimg.cc/wTQ8m9Lt/profile-photo.jpg"
                alt="Shubham Dixena"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-2 lg:order-2">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
              Hey, I'm <span className="highlight highlight-blue">Shubham!</span>
            </h1>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-serif">
              <p>
                I'm passionate about creating <span className="highlight">social impact</span> through my work and care about a variety of 
                causes including financial inclusion, gender equality, inclusion, youth development and education. 
                Over the last decade, I've contributed to these causes through my work and volunteering projects. 
                You can find some of them
              </p>
              
              <p>
                Aside from work, I write about my feelings, experiences and learning extensively because I believe 
                that these have the potential of <span className="highlight highlight-green">connecting with or helping someone</span> somewhere out there. 
                You can read some of my blogs
              </p>
              
              <p>
                When I'm not working or writing, I'm brewing my 'nth cup of tea for the day, listening to 
                music on a long walk or reading non-fiction.
              </p>
              
              <p className="text-slate-700 font-medium">
                I hope this space helps you learn a bit more about <span className="highlight highlight-purple">me and my work</span>.
              </p>
              
              <p className="text-slate-500 italic">
                Happy browsing!
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JournalHeroSection;
