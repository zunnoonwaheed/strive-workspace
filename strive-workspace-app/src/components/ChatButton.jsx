import { useState } from 'react';
import ChatBot from './ChatBot';
import './ChatButton.css';

const ChatButton = ({ isChatOpen: externalIsChatOpen, setIsChatOpen: externalSetIsChatOpen }) => {
  const [internalIsChatOpen, setInternalIsChatOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isChatOpen = externalIsChatOpen !== undefined ? externalIsChatOpen : internalIsChatOpen;
  const setIsChatOpen = externalSetIsChatOpen || setInternalIsChatOpen;

  const handleOpenChat = () => {
    // Play pop sound
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Fallback: silent if audio fails
    }
    
    setIsChatOpen(true);
  };

  return (
    <>
      <div className="chat-button-wrapper">
        <button 
          className="chat-bot-button" 
          aria-label="Chat with us"
          onClick={handleOpenChat}
        >
          <div className="chat-bot-label">
            <div className="chat-bot-icon-small">
              <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9V3H12M22.5 16.5V19.5M3 18H6M30 18H33M13.5 16.5V19.5M30 24C30 24.7956 29.6839 25.5587 29.1213 26.1213C28.5587 26.6839 27.7956 27 27 27H13.242C12.4464 27.0002 11.6835 27.3164 11.121 27.879L7.818 31.182C7.66906 31.3309 7.4793 31.4323 7.27273 31.4734C7.06616 31.5145 6.85205 31.4934 6.65746 31.4128C6.46287 31.3322 6.29655 31.1957 6.17953 31.0206C6.0625 30.8455 6.00003 30.6396 6 30.429V12C6 11.2044 6.31607 10.4413 6.87868 9.87868C7.44129 9.31607 8.20435 9 9 9H27C27.7956 9 28.5587 9.31607 29.1213 9.87868C29.6839 10.4413 30 11.2044 30 12V24Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="chat-bot-text">Strive Bot</span>
          </div>
        </button>
        <button 
          className="chat-bot-icon-large" 
          aria-label="Open chat"
          onClick={handleOpenChat}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 9V3H12M22.5 16.5V19.5M3 18H6M30 18H33M13.5 16.5V19.5M30 24C30 24.7956 29.6839 25.5587 29.1213 26.1213C28.5587 26.6839 27.7956 27 27 27H13.242C12.4464 27.0002 11.6835 27.3164 11.121 27.879L7.818 31.182C7.66906 31.3309 7.4793 31.4323 7.27273 31.4734C7.06616 31.5145 6.85205 31.4934 6.65746 31.4128C6.46287 31.3322 6.29655 31.1957 6.17953 31.0206C6.0625 30.8455 6.00003 30.6396 6 30.429V12C6 11.2044 6.31607 10.4413 6.87868 9.87868C7.44129 9.31607 8.20435 9 9 9H27C27.7956 9 28.5587 9.31607 29.1213 9.87868C29.6839 10.4413 30 11.2044 30 12V24Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatButton;
