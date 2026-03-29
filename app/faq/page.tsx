'use client';
// =============================================================================
// app/faq/page.tsx
// FAQ page - Frequently asked questions for international students
// =============================================================================

import { useState } from 'react';

export const dynamic = 'force-dynamic';

const FAQ_CATEGORIES = [
  {
    name: 'Admissions',
    faqs: [
      {
        question: 'What are the entry requirements for Chinese universities?',
        answer: 'Entry requirements vary by university and program. Generally, you need a valid passport, academic transcripts, language proficiency (HSK for Chinese-taught programs or TOEFL/IELTS for English-taught programs), and a clean criminal record. Some programs may require entrance exams or interviews.'
      },
      {
        question: 'When should I start the application process?',
        answer: 'We recommend starting 6-9 months before your intended enrollment date. Most universities have two intakes: September (Fall) and March (Spring). Application deadlines are typically 2-3 months before the intake.'
      },
      {
        question: 'Can I study in China without knowing Chinese?',
        answer: 'Yes! Many Chinese universities offer programs taught entirely in English, especially at the graduate level. You can pursue degrees in fields like Business, Engineering, Computer Science, and more without Chinese language proficiency.'
      },
      {
        question: 'How long does it take to process a student visa?',
        answer: 'The X1 student visa typically takes 2-4 weeks to process after receiving your admission letter and JW201/202 form from the university. We recommend applying as soon as you receive your acceptance letter.'
      }
    ]
  },
  {
    name: 'Scholarships',
    faqs: [
      {
        question: 'What scholarships are available for international students?',
        answer: 'There are several types of scholarships: Chinese Government Scholarships (full and partial), Provincial/Municipal scholarships, University scholarships, and Confucius Institute scholarships. Coverage includes tuition, accommodation, living allowance, and medical insurance.'
      },
      {
        question: 'How do I apply for scholarships?',
        answer: 'You can apply through the Chinese Scholarship Council (CSC) website, directly through Chinese universities, or through our platform. Most scholarship applications open in January and close around April for the Fall intake.'
      },
      {
        question: 'What is the eligibility criteria for scholarships?',
        answer: 'Eligibility varies by scholarship but generally requires: good academic standing (GPA 3.0+), valid passport, clean criminal record, and meeting the specific requirements of the scholarship type. Some scholarships have country-specific eligibility.'
      }
    ]
  },
  {
    name: 'Living in China',
    faqs: [
      {
        question: 'What is the cost of living in China?',
        answer: 'Living costs vary by city. On average, students spend $300-600/month on living expenses including accommodation, food, transportation, and personal expenses. Major cities like Beijing and Shanghai are more expensive than smaller cities.'
      },
      {
        question: 'Do universities provide accommodation?',
        answer: 'Yes, most Chinese universities provide on-campus dormitories for international students. Rooms are typically shared (2-4 students) and cost $50-150/month. Off-campus housing is also available in most cities.'
      },
      {
        question: 'Is healthcare available for international students?',
        answer: 'International students are required to have medical insurance. University hospitals and local clinics are available in most areas. Some cities have international hospitals with English-speaking staff. Basic medical care is affordable in China.'
      },
      {
        question: 'Can I work while studying in China?',
        answer: 'With a student visa (X1), you can work on campus up to 20 hours/week. Off-campus work requires special approval. Many universities have part-time positions available for students. Internships related to your field are also possible.'
      }
    ]
  },
  {
    name: 'Visa & Travel',
    faqs: [
      {
        question: 'What documents do I need for a student visa?',
        answer: 'You need: passport (valid for at least 6 months), admission letter from Chinese university, JW201/202 form, completed visa application form, passport-size photos, and proof of financial capability.'
      },
      {
        question: 'Can I extend my student visa in China?',
        answer: 'Yes, you can extend your X1 visa at the local Entry-Exit Bureau before your current visa expires. You need your university enrollment certificate and valid documents. Extensions are usually granted for the duration of your program.'
      },
      {
        question: 'What should I bring when coming to China?',
        answer: 'Essential items: passport and copies, admission letter, university documents, appropriate clothing for seasons, basic toiletries, and some local currency. Electronics and specific medications should be packed carefully. Most items can be purchased in China.'
      }
    ]
  }
];

export const dynamic = 'force-dynamic';

export default function FAQPage() {
  const [openFaqs, setOpenFaqs] = useState<{ [key: string]: boolean }>({});

  const toggleFaq = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5 position-relative d-flex align-items-center"
        style={{
          background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)',
          minHeight: '50vh',
          marginTop: '76px'
        }}
      >
        <div className="container text-center text-white py-5">
          <h1 className="display-3 fw-bold mb-4">Frequently Asked Questions</h1>
          <p className="lead mb-0" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Find answers to common questions about studying in China. 
            Can't find what you're looking for? Contact us for more information.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-5">
        <div className="container">
          {FAQ_CATEGORIES.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-5">
              <h2 className="fw-bold mb-4 text-dark">{category.name}</h2>
              <div className="accordion" id={`accordion-${categoryIndex}`}>
                {category.faqs.map((faq, faqIndex) => {
                  const isOpen = openFaqs[`${categoryIndex}-${faqIndex}`];
                  return (
                    <div key={faqIndex} className="accordion-item border rounded-3 mb-3 overflow-hidden">
                      <h3 className="accordion-header">
                        <button
                          className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                          type="button"
                          onClick={() => toggleFaq(categoryIndex, faqIndex)}
                          style={{ 
                            backgroundColor: isOpen ? '#f8fafc' : 'white',
                            fontWeight: 600,
                            color: '#0d2137'
                          }}
                        >
                          {faq.question}
                        </button>
                      </h3>
                      <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                        <div className="accordion-body text-secondary">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3 text-dark">Still Have Questions?</h2>
          <p className="text-secondary mb-4">Our team is here to help you with any questions about studying in China.</p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="/contact" className="btn btn-primary btn-lg px-4">
              Contact Us
            </a>
            <a href="/get-free-consultation" className="btn btn-outline-primary btn-lg px-4">
              Get Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}