const AboutSections = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Our role */}
          <div>
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Woman and child in outdoor setting" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Our role</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              For over 25 years, the Gates Foundation has been committed to fighting the greatest inequities in the world.
            </p>
            <a href="#" className="text-sm text-gray-800 underline hover:no-underline">
              Learn more
            </a>
          </div>

          {/* How we work */}
          <div>
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Group of people working together on community project" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">How we work</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We are focused on results. Those that can be measured. And those measured in ways beyond numbers.
            </p>
            <a href="#" className="text-sm text-gray-800 underline hover:no-underline">
              Learn more
            </a>
          </div>

          {/* Our story */}
          <div>
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Healthcare worker with children in community setting" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Our story</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Learn about the origins of the foundation and the values that drive our work.
            </p>
            <a href="#" className="text-sm text-gray-800 underline hover:no-underline">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSections;
