import { useState } from 'react';
import './ChatBot.css';

const ChatBot = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const questions = [
    {
      id: 1,
      question: "👋 Welcome to Strive Workspaces! What are you looking for?",
      options: ["Private Office", "Coworking", "Meeting Room", "Just Exploring"],
      key: "lookingFor"
    },
    {
      id: 2,
      question: "What best describes you?",
      options: ["Entrepreneur", "Remote Worker", "Agency", "Growing Team", "Other"],
      key: "description"
    },
    {
      id: 3,
      question: "How many people need workspace?",
      options: ["1", "2–5", "6–10", "10+"],
      key: "peopleCount"
    },
    {
      id: 4,
      question: "Which location are you interested in?",
      options: ["Marlton West", "Cherry Hill", "Evesham District", "Not Sure"],
      key: "location"
    },
    {
      id: 5,
      question: "When do you need the space?",
      options: ["ASAP", "Within 1 Month", "1–3 Months", "Just Researching"],
      key: "timeline"
    },
    {
      id: 6,
      question: "How often will you use the workspace?",
      options: ["Daily", "Few Days Weekly", "Occasionally", "Meetings Only"],
      key: "frequency"
    },
    {
      id: 7,
      question: "👍 Want us to get in touch with you to discuss your workspace needs?",
      options: ["Yes, Contact Me", "Yes, Schedule a Tour", "Request a Call Back"],
      key: "contactPreference"
    },
    {
      id: 8,
      question: "Great 👍 What's your name?",
      type: "input",
      key: "name"
    },
    {
      id: 9,
      question: "What's your email?",
      type: "input",
      inputType: "email",
      key: "email"
    },
    {
      id: 10,
      question: "Phone number for tour confirmation?",
      type: "input",
      inputType: "tel",
      key: "phone"
    }
  ];

  const handleOptionClick = (option) => {
    const currentQuestion = questions[step];
    setResponses({ ...responses, [currentQuestion.key]: option });
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleInputChange = (e) => {
    const currentQuestion = questions[step];
    setFormData({ ...formData, [currentQuestion.key]: e.target.value });
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const currentQuestion = questions[step];
    const value = formData[currentQuestion.key];
    
    if (!value) return;
    
    setResponses({ ...responses, [currentQuestion.key]: value });
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Final step - submit
      setTimeout(() => {
        handleSubmit();
      }, 500);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    const finalData = { ...responses, ...formData };
    console.log('Form submitted:', finalData);
    
    // You can add API call here:
    // fetch('/api/chatbot-submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(finalData)
    // });
    
    setStep(questions.length); // Move to thank you message
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (!isOpen) return null;

  const currentQuestion = questions[step];
  const isComplete = step === questions.length;

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <h3>Strive Workspaces</h3>
          <button className="chatbot-close" onClick={onClose}>×</button>
        </div>
        
        <div className="chatbot-messages">
          {step > 0 && (
            <div className="message-history">
              {questions.slice(0, step).map((q, idx) => (
                <div key={idx}>
                  <div className="bot-message">
                    <div className="message-bubble bot">{q.question}</div>
                  </div>
                  {responses[q.key] && (
                    <div className="user-message">
                      <div className="message-bubble user">{responses[q.key]}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isComplete ? (
            <>
              <div className="bot-message">
                <div className="message-bubble bot">{currentQuestion.question}</div>
              </div>

              {currentQuestion.type === "input" ? (
                <form onSubmit={handleInputSubmit} className="chatbot-form">
                  <input
                    type={currentQuestion.inputType || "text"}
                    value={formData[currentQuestion.key] || ''}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${currentQuestion.key}`}
                    className="chatbot-input"
                    required
                  />
                  <div className="chatbot-actions">
                    {step > 0 && (
                      <button type="button" onClick={handleBack} className="btn-chat-back">
                        Back
                      </button>
                    )}
                    <button type="submit" className="btn-chat-submit">
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div className="chatbot-options">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className="chatbot-option-btn"
                    >
                      {option}
                    </button>
                  ))}
                  {step > 0 && (
                    <button onClick={handleBack} className="btn-chat-back">
                      ← Back
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bot-message">
              <div className="message-bubble bot">
                Thanks! Our team will contact you within 24 hours.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
