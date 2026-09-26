import { useState } from "react";
import { faqData } from "./FaqData";
import "./Faq.css";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.id}
              className={`faq-item ${isOpen ? "active" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon" >{isOpen ? "-": "+"}</span>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;