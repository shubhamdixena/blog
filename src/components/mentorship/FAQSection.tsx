
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How is your mentorship different from typical consultants?",
    answer: "I'm not your typical agency or corporate consultant. I work alone, and you won't deal with anyone else. Think of me as a mentor, not a service provider."
  },
  {
    question: "What's your process for helping with applications?",
    answer: "Usually, I draft the main documents myself—after getting to know your story—and then we work together to personalize and polish everything. This saves time and lets you focus on your strengths, not just on \"writing tricks.\""
  },
  {
    question: "Do I have to pay for your help?",
    answer: "It depends. My goal isn't to make money from this work. If you're applying to a competitive program and can pay, I'll charge enough to make the time sustainable for me, but it's never a \"business.\" If you have a disability, you'll never pay for my time."
  },
  {
    question: "Why do you focus on applicants with disabilities?",
    answer: "I believe that talent deserves opportunity, not barriers. My vision is to see 200+ people with disabilities in the world's best institutions—and I want to do everything I can to help make that possible."
  },
  {
    question: "Why don't you expand with a bigger team?",
    answer: "This is personal for me. I haven't found anyone who shares the same passion for mentoring applicants with disabilities. I believe one person's sincere effort can still make a difference."
  },
  {
    question: "How many people do you help at once?",
    answer: "At most, three applications at a time. This helps me stay personally invested and available."
  },
  {
    question: "Is your schedule strict or formal?",
    answer: "Not at all. There's no ticket system, no rigid appointments. We work on mutual trust and understanding. Call or message when you need to—within reason, I'll always get back to you as soon as I can."
  },
  {
    question: "What kind of programs do you help with?",
    answer: "MBA, Master's, PhD, fellowships, scholarships—any competitive academic or professional opportunity, worldwide."
  },
  {
    question: "Do I have to be a great writer to work with you?",
    answer: "No. My approach is to help you focus on what you want to say, not how to say it. I'll help with the writing, and we'll polish it together."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns
  const leftColumnFAQs = faqs.filter((_, index) => index % 2 === 0);
  const rightColumnFAQs = faqs.filter((_, index) => index % 2 === 1);

  const renderFAQColumn = (faqList: typeof faqs, startIndex: number) => (
    <div className="space-y-3">
      {faqList.map((faq, index) => {
        const actualIndex = startIndex + index * 2;
        return (
          <div 
            key={actualIndex}
            className="border rounded-xl overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: openIndex === actualIndex ? '#F5F5F7' : '#FFFFFF',
              borderColor: openIndex === actualIndex ? '#007AFF' : '#E5E5E7',
              boxShadow: openIndex === actualIndex ? '0 4px 20px rgba(0, 122, 255, 0.1)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <button
              onClick={() => toggleFAQ(actualIndex)}
              className="w-full p-5 text-left flex items-center justify-between group hover:bg-gray-50/50 transition-colors duration-200"
            >
              <h3 className="pr-4 leading-relaxed text-base font-semibold text-black">
                {faq.question}
              </h3>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === actualIndex ? 'rotate-180 text-blue-600' : 'text-slate-500'
                }`}
              />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              openIndex === actualIndex ? 'max-h-96 pb-5' : 'max-h-0'
            }`}>
              <div className="px-5">
                <div className="border-t border-slate-200 pt-3">
                  <p className="leading-relaxed text-sm text-slate-900">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-100">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-black">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-500">
            Find answers to common questions about the mentorship process and our commitment to accessibility.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {renderFAQColumn(leftColumnFAQs, 0)}
          {renderFAQColumn(rightColumnFAQs, 1)}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
