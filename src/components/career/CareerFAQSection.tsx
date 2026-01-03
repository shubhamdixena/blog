import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function CareerFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "When should I start thinking about my career?",
      answer: "It's never too early! High school is a great time to start exploring your interests and strengths. However, career exploration is an ongoing process that continues throughout your life as you grow and change."
    },
    {
      question: "How do I choose between multiple career interests?",
      answer: "Start by researching job market trends, talking to professionals in those fields, and gaining hands-on experience through internships or volunteer work. Remember, you can often combine multiple interests into one career or change paths later."
    },
    {
      question: "Do I need to know my exact career path before choosing a college major?",
      answer: "Not necessarily! Many successful professionals work in fields different from their college major. Focus on developing transferable skills like critical thinking, communication, and problem-solving. You can also choose a broad major that keeps multiple career doors open."
    },
    {
      question: "What if I'm interested in a field with limited job opportunities?",
      answer: "Research thoroughly to understand the reality of that field. Consider related areas with better prospects, look into emerging roles within that industry, or think about how you could create your own opportunities through entrepreneurship or freelancing."
    },
    {
      question: "How important are grades for my career prospects?",
      answer: "While grades matter for some careers and graduate school admissions, they're not everything. Focus on developing practical skills, gaining experience through internships, building a portfolio, and networking. Many employers value real-world experience and soft skills alongside academic performance."
    },
    {
      question: "Should I pursue my passion or choose a practical career?",
      answer: "The best careers often combine both! Look for ways to incorporate your passions into practical career paths. Consider the job market, salary expectations, and growth potential, but also ensure your work aligns with your values and interests for long-term satisfaction."
    },
    {
      question: "How can I gain experience in my field of interest while still in school?",
      answer: "Look for internships, part-time jobs, volunteer opportunities, job shadowing, school clubs, competitions, online courses, and personal projects. Many professionals are willing to share their experiences through informational interviews."
    },
    {
      question: "What if I change my mind about my career choice later?",
      answer: "Career changes are completely normal! Most people change careers multiple times in their lifetime. The skills and experiences you gain are rarely wasted – they often transfer to new roles in unexpected ways. Stay flexible and view your career as a journey, not a destination."
    },
    {
      question: "How do I know if a career is right for me?",
      answer: "Consider factors like your natural strengths, what energizes you, work-life balance preferences, and long-term goals. Try to get exposure through internships, job shadowing, or informational interviews. Pay attention to what aspects of different activities you enjoy most."
    }
  ];

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
            className="border rounded-xl overflow-hidden transition-all duration-300 bg-white border-slate-200 hover:shadow-sm"
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
            Common questions from students about career planning and guidance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {renderFAQColumn(leftColumnFAQs, 0)}
          {renderFAQColumn(rightColumnFAQs, 1)}
        </div>
      </div>
    </section>
  );
}
