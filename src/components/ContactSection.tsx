const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Contact form submitted');
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl mb-4 leading-[1.1] text-[#1A1A1A] font-bold">
              Get in touch
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Have questions about our work or want to get involved? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#1caba2] rounded-full flex items-center justify-center text-white font-bold">
                  📧
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Email us</h3>
                  <p className="text-gray-600 mb-2">Get in touch with our team</p>
                  <a href="mailto:info@charitywater.org" className="text-[#1caba2] hover:underline">
                    info@charitywater.org
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#1caba2] rounded-full flex items-center justify-center text-white font-bold">
                  📞
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Call us</h3>
                  <p className="text-gray-600 mb-2">Speak with our support team</p>
                  <a href="tel:+1234567890" className="text-[#1caba2] hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#1caba2] rounded-full flex items-center justify-center text-white font-bold">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Visit us</h3>
                  <p className="text-gray-600">
                    200 Varick Street<br />
                    New York, NY 10014<br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1caba2] focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1caba2] focus:border-transparent"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1caba2] focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1caba2] focus:border-transparent"
                required
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1caba2] focus:border-transparent resize-none"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-[#1caba2] text-white text-sm font-bold rounded-full hover:bg-[#168a82] transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
