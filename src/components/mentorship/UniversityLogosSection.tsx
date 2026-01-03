const UniversityLogosSection = () => {
  const universities = [
    { name: "Harvard", logo: "https://logos-world.net/wp-content/uploads/2021/09/Harvard-Logo.png" },
    { name: "MIT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" },
    { name: "Stanford", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Stanford_University.svg" },
    { name: "Oxford", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg" },
    { name: "Cambridge", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg" },
    { name: "Yale", logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Yale_University_Shield_1.svg" },
    { name: "Princeton", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg" },
    { name: "Columbia", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Columbia_University_Logo.svg" },
    { name: "University of Pennsylvania", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_banner.svg" },
    { name: "Caltech", logo: "https://upload.wikimedia.org/wikipedia/en/a/a4/Seal_of_the_California_Institute_of_Technology.svg" },
    { name: "Berkeley", logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/University_of_California%2C_Berkeley_logo.svg" },
    { name: "University of Chicago", logo: "https://upload.wikimedia.org/wikipedia/en/7/79/University_of_Chicago_shield.svg" },
    { name: "Cornell", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Cornell_University_seal.svg" },
    { name: "Brown", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Brown_University_Coat_of_Arms.svg" },
    { name: "Dartmouth", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Dartmouth_College_shield.svg" },
    { name: "Northwestern", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Northwestern_University_seal.svg" },
    { name: "Duke", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Duke_University_Crest.svg" },
    { name: "Carnegie Mellon", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Carnegie_Mellon_University_seal.svg" },
    { name: "UCLA", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/The_University_of_California_UCLA.svg" },
    { name: "Georgetown", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Georgetown_University_seal.svg" }
  ];

  // Split universities into two rows
  const firstRow = universities.slice(0, 10);
  const secondRow = universities.slice(10, 20);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900">
            Where My Students Have Been Accepted
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-slate-600">
            Students I've had the privilege to mentor have been accepted to leading institutions worldwide
          </p>
        </div>

        {/* Two rows of compact, colorful logos */}
        <div className="space-y-6">
          {/* First row */}
          <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6 lg:gap-8">
            {firstRow.map((university, index) => (
              <div
                key={`row1-${index}`}
                className="flex items-center justify-center p-2 hover:scale-110 transition-transform duration-300"
                style={{ width: '70px', height: '70px' }}
              >
                <img
                  src={university.logo}
                  alt={university.name}
                  className="max-w-full max-h-full object-contain"
                  title={university.name}
                />
              </div>
            ))}
          </div>
          
          {/* Second row */}
          <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6 lg:gap-8">
            {secondRow.map((university, index) => (
              <div
                key={`row2-${index}`}
                className="flex items-center justify-center p-2 hover:scale-110 transition-transform duration-300"
                style={{ width: '70px', height: '70px' }}
              >
                <img
                  src={university.logo}
                  alt={university.name}
                  className="max-w-full max-h-full object-contain"
                  title={university.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityLogosSection;
