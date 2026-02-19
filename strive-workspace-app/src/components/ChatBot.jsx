import { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { API_ENDPOINTS } from '../config';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    lookingFor: null,
    description: null,
    peopleCount: null,
    location: null,
    timeline: null,
    frequency: null,
    contactPreference: null,
    name: null,
    email: null,
    phone: null
  });
  const [collectingContact, setCollectingContact] = useState(false);
  const [contactStep, setContactStep] = useState('email'); // 'email' or 'phone'
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [conversationMode, setConversationMode] = useState('exploring'); // 'exploring', 'collecting', 'complete'
  const messagesEndRef = useRef(null);
  const sessionIdRef = useRef(null);

  // Generate or retrieve session ID
  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log('🆔 New session created:', sessionIdRef.current);
    }
  }, []);

  // Log API configuration on component mount
  useEffect(() => {
    console.log('🔧 ChatBot API Configuration:');
    console.log('  - Conversations endpoint:', API_ENDPOINTS.conversations);
    console.log('  - VITE_API_URL:', import.meta.env.VITE_API_URL);
  }, []);

  // Function to save conversation to backend
  const saveConversation = async (userMessage, botResponse, intentTopic = null, overrideEmail = null, overridePhone = null) => {
    try {
      const payload = {
        session_id: sessionIdRef.current,
        user_message: userMessage,
        bot_response: botResponse,
        user_email: overrideEmail || userInfo.email || null,
        user_phone: overridePhone || userInfo.phone || null,
        intent_topic: intentTopic || null
      };

      console.log('💾 Saving conversation to backend');
      console.log('📍 API Endpoint:', API_ENDPOINTS.conversations);
      console.log('📦 Payload:', payload);

      const response = await fetch(API_ENDPOINTS.conversations, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('📡 Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Conversation saved successfully:', data);
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to save conversation. Status:', response.status);
        console.error('❌ Error details:', errorText);
      }
    } catch (error) {
      console.error('❌ Network error saving conversation:', error);
      console.error('❌ Error details:', error.message, error.stack);
      // Silently fail - don't interrupt user experience
    }
  };

  const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY || '';
  const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

  // Knowledge base from Strive Workspaces website
  const knowledgeBase = {
    locations: [
      { name: 'Marlton, NJ', address: '1 Executive Drive, Marlton, NJ 08053', phone: '(856) 446-8464', email: 'executive1@striveworkspaces.com' },
      { name: 'Princeton, NJ', address: '150 College Rd W Princeton, NJ 08540', phone: '(469) 960-4018', email: '150college@striveworkspaces.com' },
      { name: 'Nashville, TN', address: '501 Union St, Suite 400, Nashville, TN 37219', phone: '(615) 761-9037', email: '501union@striveworkspaces.com' },
      { name: 'Plano, TX', address: '1400 Preston Rd. Suite 400 Plano TX 75093', phone: '(469) 960-4018', email: '1400preston@striveworkspaces.com' },
      { name: 'North Dallas, TX', address: '15150 Preston Rd Suite 300 Dallas TX 75248', phone: '(469) 737-9316', email: 'prestongrove@striveworkspaces.com' },
      { name: 'Denver, CO', address: '1630 Welton St, Denver, CO 80202', phone: '(720) 604-0449', email: 'denver1@striveworkspaces.com' },
      { name: 'Boulder, CO', address: '1495 Canyon Blvd, Boulder, CO 80302', phone: '(720) 400-7991', email: '1495canyon@striveworkspaces.com' },
      { name: 'Ann Arbor, MI', address: '4750 Venture Dr Suite 400 Ann Arbor, MI 48108', phone: '734-251-3002', email: 'annarbor@striveworkspaces.com' },
      { name: 'Seattle, WA', address: '2801 Alaskan Way Seattle, WA 98121', phone: '(206) 466-0657', email: 'pier70@striveworkspaces.com' },
      { name: 'VX Braniff Centre, Dallas, TX', address: '7701 Lemmon Ave Ste, 260 Dallas, TX 75209', phone: '(972) 430-8050', email: 'sales.braniff@venturex.com' },
      { name: 'Flex at The Gild, Dallas, TX', address: '8350 N Central Expy Suite 1900 Dallas TX 75206', phone: '(469) 737-9733', email: 'info@flexatthegild.com' },
      { name: 'Office Evolution, Cypress, TX', address: '14150 Huffmeister Rd., Suite 200 Cypress, TX 77429', phone: '(346) 616-1357', email: 'cypress.tx@officeevolution.com' },
      { name: 'LoHi, Denver, CO', address: '2563 15th Street Denver, CO 80211', phone: '(720) 881-9313', email: 'denver15@striveworkspaces.com' }
    ],
    spaces: {
      'Private Office': { price: 'From $450/mo', description: 'Secure, lockable offices for privacy and team collaboration.' },
      'Dedicated Desk': { price: 'From $300/mo', description: 'Reserve your own desk in a shared area for a consistent workspace.' },
      'Hot Desk': { price: 'From $99/hr', description: 'Flexible seating in our communal area, ideal for freelancers and remote workers.' },
      'Meeting Room': { price: 'From $30/hr', description: 'Professional spaces with AV equipment, bookable by the hour or day.' },
      'Event Space': { price: 'From $160/hr', description: 'Versatile venues for workshops, seminars, and networking events.' },
      'Virtual Office': { price: 'From $65/mo', description: 'Professional business address with mail handling services for remote teams.' }
    },
    amenities: [
      'High Speed Internet',
      'Snacks and Beverages',
      'Mail & Package Handling',
      'Lounge Areas',
      'Printing and Scanning',
      'Fully Furnished Offices',
      'Secured Workspaces',
      '24/7 Access',
      'On-Site Support'
    ],
    benefits: [
      'Community and Networking - Be part of a vibrant community where you can network with like-minded professionals.',
      'Flexibility - Flexible membership plans that cater to different needs, whether you need a desk for a day or an office for a year.',
      'Cost-Effective - Coworking spaces eliminate the overhead costs associated with traditional office spaces.',
      'Amenities and Services - A wide range of amenities including high-speed internet, printing services, and complimentary refreshments.',
      'Inspiration and Creativity - The dynamic and diverse atmosphere can inspire new ideas and approaches to your work.',
      'Work-Life Balance - Spaces designed to promote a healthy work-life balance, including wellness rooms and social events.'
    ],
    support: {
      phone: '(214)-851-1233',
      email: 'info@striveworkspaces.com',
      hours: 'Available during business hours',
      availability: 'On-site support at all locations'
    },
    countries: ['United States', 'USA', 'US'],
    regions: {
      'New Jersey': ['Marlton', 'Princeton'],
      'Texas': ['Dallas', 'Plano', 'North Dallas', 'Cypress'],
      'Tennessee': ['Nashville'],
      'Michigan': ['Ann Arbor'],
      'Colorado': ['Denver', 'Boulder'],
      'Washington': ['Seattle']
    }
  };

  const quickActions = [
    'Tell me about pricing',
    'What locations do you have?',
    'What amenities are included?',
    'Schedule a tour',
    'Tell me about private offices',
    'What is coworking?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        role: 'bot',
        content: "Hi there! 👋\n\nI'm your AI assistant for Strive Workspaces!\n\nI can help you learn about our flexible coworking spaces, private offices, meeting rooms, and more.\n\nHow can I help you today?"
      };
      setMessages([welcomeMessage]);
      setShowQuickActions(true);
    }
  }, [isOpen]);

  const detectUserIntent = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check if user is asking a question
    const questionKeywords = ['what', 'how', 'when', 'where', 'why', 'tell me', 'explain', 'show me', 'do you', 'can you', 'is there', 'are there'];
    const isQuestion = questionKeywords.some(keyword => input.includes(keyword)) || input.includes('?');
    
    // Check for specific topics
    if (input.includes('cheapest') || input.includes('cheap') || input.includes('lowest') || input.includes('affordable') || input.includes('budget')) {
      return { type: 'question', topic: 'cheapest' };
    }
    if (input.includes('how many') || input.includes('number of') || input.includes('count') || input.includes('total')) {
      return { type: 'question', topic: 'count' };
    }
    if (input.includes('2 person') || input.includes('two person') || input.includes('2 people') || input.includes('two people') || input.includes('2-person') || input.includes('for 2')) {
      return { type: 'question', topic: 'team_size' };
    }
    if (input.includes('about yourself') || input.includes('who are you') || input.includes('what are you')) {
      return { type: 'question', topic: 'about_bot' };
    }
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return { type: 'question', topic: 'pricing' };
    }
    if (input.includes('location') || input.includes('where') || input.includes('address') || input.includes('available') || input.includes('pakistan') || input.includes('india') || input.includes('country') || input.includes('countries')) {
      return { type: 'question', topic: 'locations' };
    }
    if (input.includes('amenit') || input.includes('include') || input.includes('feature')) {
      return { type: 'question', topic: 'amenities' };
    }
    if (input.includes('private office') || input.includes('office')) {
      return { type: 'question', topic: 'private_office' };
    }
    if (input.includes('coworking') || input.includes('hot desk') || input.includes('dedicated desk')) {
      return { type: 'question', topic: 'coworking' };
    }
    if (input.includes('tour') || input.includes('visit') || input.includes('see')) {
      return { type: 'question', topic: 'tour' };
    }
    if (input.includes('benefit') || input.includes('why') || input.includes('advantage')) {
      return { type: 'question', topic: 'benefits' };
    }
    if (input.includes('support') || input.includes('help') || input.includes('contact') || input.includes('phone') || input.includes('email') || input.includes('reach')) {
      return { type: 'question', topic: 'support' };
    }
    // Check for requests for company contact details
    if (input.includes('your number') || input.includes('your phone') || input.includes('your contact') ||
        input.includes('give me your') || input.includes('what is your') || input.includes("what's your") ||
        input.includes('company number') || input.includes('company phone') || input.includes('company contact') ||
        input.includes('contact details') || input.includes('contact info') || input.includes('contact information') ||
        input.includes('how to contact') || input.includes('reach you') || input.includes('call you') ||
        input.includes('email you') || input.includes('your email')) {
      return { type: 'question', topic: 'show_contact' };
    }
    
    // Check for user declining to provide info
    if (input.includes("don't want to give") || input.includes("dont want to give") ||
        input.includes("don't want to provide") || input.includes("dont want to provide") ||
        input.includes("don't want to share") || input.includes("dont want to share") ||
        input.includes("won't give") || input.includes("wont give") ||
        input.includes("can't give") || input.includes("cant give") ||
        input.includes("prefer not to give") || input.includes("rather not give") ||
        input.includes("no thanks") || input.includes("no thank you") ||
        (input.includes("no") && (input.includes("email") || input.includes("phone") || input.includes("number"))) ||
        input.includes("skip") || input.includes("not interested")) {
      return { type: 'question', topic: 'show_contact' };
    }
    
    // Check for live agent requests
    if (input.includes('live agent') || input.includes('human agent') || input.includes('real person') || 
        input.includes('speak to someone') || input.includes('talk to someone') || 
        input.includes('connect me with') || input.includes('connect me to') ||
        input.includes('transfer to') || input.includes('transfer me') ||
        input.includes('connect with agent') || input.includes('speak with agent') ||
        input.includes('talk with agent') || input.includes('contact agent') ||
        input.includes('connect to live') || input.includes('connect to agent') ||
        (input.includes('agent') && (input.includes('connect') || input.includes('speak') || input.includes('talk'))) ||
        (input.includes('person') && (input.includes('connect') || input.includes('speak') || input.includes('talk') || input.includes('live')))) {
      return { type: 'question', topic: 'schedule_call' };
    }
    // Check if user wants to schedule call/meeting/callback and doesn't want to chat - MAIN GOAL: CAPTURE EMAIL & PHONE
    const scheduleKeywords = [
      'schedule', 'book', 'arrange', 'set up', 'setup', 'organize'
    ];
    const callKeywords = [
      'call', 'callback', 'call back', 'phone call', 'phone', 'telephone',
      'meeting', 'appointment', 'consultation', 'discussion', 'talk',
      'speak', 'conversation', 'chat with someone', 'talk to someone',
      'speak with', 'contact me', 'reach out', 'get in touch',
      'connect', 'reach me', 'call me', 'contact', 'reach'
    ];
    const dontWantKeywords = [
      "don't want", 'dont want', "don't want to talk", 'dont want to talk',
      "don't want to chat", 'dont want to chat', 'prefer not to chat',
      'rather not chat', 'not interested in chatting', 'no chat',
      'skip chat', 'skip the chat', 'end chat', 'stop chatting'
    ];
    
    // Check for schedule/call/meeting requests
    const hasScheduleKeyword = scheduleKeywords.some(keyword => input.includes(keyword));
    const hasCallKeyword = callKeywords.some(keyword => input.includes(keyword));
    
    if (hasScheduleKeyword && hasCallKeyword) {
      return { type: 'question', topic: 'schedule_call' };
    }
    
    // Check for "don't want to talk" variations
    if (dontWantKeywords.some(keyword => input.includes(keyword))) {
      return { type: 'question', topic: 'schedule_call' };
    }
    
    // Check for "want to talk to someone" or "speak with someone"
    if ((input.includes('want to talk') || input.includes('want to speak') || 
         input.includes('speak with') || input.includes('talk to someone') ||
         input.includes('speak to someone') || input.includes('contact someone') ||
         input.includes('call someone') || input.includes('reach someone')) &&
        (input.includes('someone') || input.includes('person') || input.includes('human') || input.includes('representative'))) {
      return { type: 'question', topic: 'schedule_call' };
    }
    
    // Check for callback requests
    if (input.includes('callback') || input.includes('call back') || input.includes('call-back')) {
      return { type: 'question', topic: 'schedule_call' };
    }
    
    // Check for meeting requests
    if (input.includes('meeting') && (input.includes('schedule') || input.includes('book') || input.includes('arrange') || input.includes('set'))) {
      return { type: 'question', topic: 'schedule_call' };
    }
    
    // Check for "contact me" or "call me" requests
    if ((input.includes('contact me') || input.includes('call me') || input.includes('reach me') || 
         input.includes('get in touch') || input.includes('connect with me')) &&
        !input.includes('email') && !input.includes('phone')) {
      return { type: 'question', topic: 'schedule_call' };
    }
    
    // Check if it's an answer to our question
    const answerKeywords = ['private office', 'coworking', 'meeting room', 'entrepreneur', 'remote worker', 'agency', 'asap', 'within', 'daily', 'few days', 'occasionally'];
    if (answerKeywords.some(keyword => input.includes(keyword)) && !isQuestion) {
      return { type: 'answer' };
    }
    
    return { type: isQuestion ? 'question' : 'answer', topic: 'general' };
  };

  const getKnowledgeResponse = (topic, userInput = '') => {
    switch (topic) {
      case 'pricing':
        return `Great question! Here's our pricing from striveworkspaces.com:\n\n` +
               `🏢 Private Offices: ${knowledgeBase.spaces['Private Office'].price}\n` +
               `🪑 Dedicated Desks: ${knowledgeBase.spaces['Dedicated Desk'].price}\n` +
               `💻 Hot Desks/Coworking: ${knowledgeBase.spaces['Hot Desk'].price}\n` +
               `📅 Meeting Rooms: ${knowledgeBase.spaces['Meeting Room'].price}\n` +
               `🎉 Event Spaces: ${knowledgeBase.spaces['Event Space'].price}\n` +
               `📬 Virtual Offices: ${knowledgeBase.spaces['Virtual Office'].price}\n\n` +
               `All our memberships are flexible with month-to-month options. Would you like to know more about any specific space type?`;
      
      case 'locations':
        // Check if user is asking about a specific country
        const userInputLower = (userInput || '').toLowerCase();
        if (userInputLower.includes('pakistan') || userInputLower.includes('india') || userInputLower.includes('uk') || userInputLower.includes('canada') || userInputLower.includes('australia') || userInputLower.includes('international')) {
          return `I appreciate your interest! 🌍 Currently, Strive Workspaces operates exclusively in the United States. We have amazing locations across New Jersey, Texas, Tennessee, Michigan, Colorado, and Washington.\n\nHowever, we do offer Virtual Office services that might work for you! This gives you a professional US business address and mail handling services.\n\nWould you like to learn more about our US locations or our Virtual Office services?`;
        }
        
        return `We have locations across the US! Here are our main locations:\n\n` +
               knowledgeBase.locations.slice(0, 5).map(loc => 
                 `📍 ${loc.name}\n   ${loc.address}\n   📞 ${loc.phone}`
               ).join('\n\n') +
               `\n\nWe also have locations in Boulder, Ann Arbor, Seattle, and more! Which location interests you?`;
      
      case 'amenities':
        return `Our spaces come with amazing amenities! Here's what's included:\n\n` +
               knowledgeBase.amenities.map(amenity => `✅ ${amenity}`).join('\n') +
               `\n\nEverything you need to be productive and comfortable! Would you like to know more about any specific amenity?`;
      
      case 'private_office':
        return `Private Offices are perfect for teams that need privacy and professionalism! ${knowledgeBase.spaces['Private Office'].description}\n\n` +
               `💰 ${knowledgeBase.spaces['Private Office'].price}\n\n` +
               `Features include:\n` +
               `🔒 Secure, lockable offices\n` +
               `👥 Perfect for team collaboration\n` +
               `🪑 Fully furnished\n` +
               `🔑 24/7 access\n\n` +
               `Would you like to schedule a tour to see our private offices?`;
      
      case 'coworking':
        return `Coworking is perfect for flexibility! According to striveworkspaces.com, we offer:\n\n` +
               `💻 Hot Desks/Coworking: ${knowledgeBase.spaces['Hot Desk'].description} - ${knowledgeBase.spaces['Hot Desk'].price}\n` +
               `🪑 Dedicated Desks: ${knowledgeBase.spaces['Dedicated Desk'].description} - ${knowledgeBase.spaces['Dedicated Desk'].price}\n\n` +
               `Coworking is a flexible workspace model where individuals and teams share professional office amenities without long-term leases. You get access to our vibrant community, networking events, and all amenities. Which option sounds better for you?`;
      
      case 'tour':
        return `I'd love to help you schedule a tour! 🎉\n\n` +
               `Tours are the best way to see our spaces and find what works for you. I can help you find the perfect location and time.\n\n` +
               `Which location are you interested in? Or would you like me to collect some information first to personalize your tour experience?`;
      
      case 'benefits':
        return `Here's why professionals choose Strive Workspaces:\n\n` +
               knowledgeBase.benefits.map((benefit, idx) => `${idx + 1}. ${benefit}`).join('\n\n') +
               `\n\nWould you like to learn more about any of these benefits?`;
      
      case 'support':
        return `We're here to help! 📞\n\n` +
               `📧 Email: ${knowledgeBase.support.email}\n` +
               `📞 Phone: ${knowledgeBase.support.phone}\n` +
               `⏰ ${knowledgeBase.support.hours}\n` +
               `🏢 ${knowledgeBase.support.availability}\n\n` +
               `Feel free to reach out anytime - we'd love to help you find your perfect workspace!`;
      
      case 'show_contact':
        return `Absolutely! Here's how you can reach us: 📞\n\n` +
               `📧 Email: ${knowledgeBase.support.email}\n` +
               `📞 Phone: ${knowledgeBase.support.phone}\n` +
               `⏰ ${knowledgeBase.support.hours}\n` +
               `🏢 ${knowledgeBase.support.availability}\n\n` +
               `Feel free to call or email us anytime - we'd love to help you find your perfect workspace!`;
      
      case 'schedule_call':
        return null; // Will be handled by collecting email/phone
      
      case 'cheapest':
        return `Great question! 💰 Our most affordable option is:\n\n` +
               `📬 Virtual Offices: ${knowledgeBase.spaces['Virtual Office'].price} - Perfect for remote teams who need a professional business address and mail handling.\n\n` +
               `For physical workspace, the cheapest monthly option is:\n` +
               `🪑 Dedicated Desks: ${knowledgeBase.spaces['Dedicated Desk'].price} - Your own desk in a shared area.\n\n` +
               `For hourly access:\n` +
               `💻 Hot Desks/Coworking: ${knowledgeBase.spaces['Hot Desk'].price} - Flexible hourly access to our coworking spaces.\n\n` +
               `Would you like to know more about Virtual Offices or Dedicated Desks?`;
      
      case 'count':
        return `We have ${knowledgeBase.locations.length} locations across the United States! 🏢\n\n` +
               `Our locations span across:\n` +
               `📍 New Jersey: Marlton, Princeton\n` +
               `📍 Texas: Dallas (multiple locations), Plano, North Dallas, Cypress\n` +
               `📍 Tennessee: Nashville\n` +
               `📍 Michigan: Ann Arbor\n` +
               `📍 Colorado: Denver (Downtown & LoHi), Boulder\n` +
               `📍 Washington: Seattle (Waterfront)\n\n` +
               `We also have 1,200+ members across all locations! Each location offers various workspace options. Which location interests you?`;
      
      case 'team_size':
        return `Perfect for 2 people! 👥 Here are the best options:\n\n` +
               `🪑 Dedicated Desks: ${knowledgeBase.spaces['Dedicated Desk'].price} - Each person gets their own desk in a shared area. Great for small teams!\n\n` +
               `🏢 Private Office: ${knowledgeBase.spaces['Private Office'].price} - A private, lockable office perfect for 2-person teams who need privacy and collaboration space.\n\n` +
               `💻 Hot Desks: ${knowledgeBase.spaces['Hot Desk'].price} - Flexible option if you don't need dedicated space every day.\n\n` +
               `Which option sounds best for your team? I can help you find the perfect fit!`;
      
      case 'about_bot':
        return `Hi! I'm the Strive Workspaces AI assistant! 🤖✨\n\n` +
               `I'm here to help you:\n` +
               `✅ Learn about our flexible workspace options\n` +
               `✅ Find the perfect space for your needs\n` +
               `✅ Answer questions about pricing, locations, and amenities\n` +
               `✅ Schedule tours and connect you with our team\n\n` +
               `I can chat with you naturally - ask me anything about Strive Workspaces, or I can help guide you through finding your perfect workspace solution! What would you like to know?`;
      
      default:
        return null;
    }
  };

  const callGrokAPI = async (userMessage, conversationContext, userInfo, intent) => {
    try {
      const knowledgeContext = `
STRIVE WORKSPACES KNOWLEDGE BASE (from striveworkspaces.com):
- Locations: ${knowledgeBase.locations.map(l => l.name).join(', ')}
- Space Types: Private Offices (from $450/mo), Dedicated Desks (from $300/mo), Hot Desks/Coworking (from $99/hr), Meeting Rooms (from $30/hr), Event Spaces (from $160/hr), Virtual Offices (from $65/mo)
- Amenities: ${knowledgeBase.amenities.join(', ')}
- All memberships are flexible, month-to-month
- Contact: (214)-851-1233 or info@striveworkspaces.com
- Website: striveworkspaces.com
- We have 1,200+ members across all locations

USER INFORMATION COLLECTED SO FAR:
${JSON.stringify(userInfo, null, 2)}

CONVERSATION CONTEXT:
- Current mode: ${conversationMode}
- User intent: ${intent.type} - ${intent.topic || 'general'}
`;

      const systemPrompt = `You are a friendly, conversational AI assistant for Strive Workspaces, a premium flexible coworking and private office space provider with locations across the United States ONLY.

CRITICAL INFORMATION:
- Strive Workspaces ONLY operates in the United States (US)
- We have ${knowledgeBase.locations.length} locations in: New Jersey (Marlton, Princeton), Texas (Dallas, Plano, North Dallas, Cypress), Tennessee (Nashville), Michigan (Ann Arbor), Colorado (Denver, Boulder), Washington (Seattle)
- We do NOT have locations outside the United States (no Pakistan, no India, no other countries)
- Pricing: Virtual Offices ($65/mo - cheapest), Hot Desks/Coworking ($99/hr), Dedicated Desks ($300/mo), Private Offices ($450/mo), Meeting Rooms ($30/hr), Event Spaces ($160/hr)
- Cheapest option: Virtual Offices at $65/month (for address/mail), Dedicated Desks at $300/month (for physical workspace)
- For 2 people: Dedicated Desks ($300/mo each) or Private Office ($450/mo) are best options

YOUR PERSONALITY:
- Warm, enthusiastic, and genuinely helpful
- Conversational and natural - like talking to a knowledgeable friend
- Proactive in offering helpful information
- Can answer questions AND ask questions naturally
- Use emojis naturally but sparingly (1-2 per response max)
- Keep responses concise (2-4 sentences) unless user asks for details

YOUR CAPABILITIES:
- Answer questions about pricing, locations (US only), amenities, space types, benefits, support
- Answer questions like "cheapest option", "how many locations", "2 person space", "about yourself"
- Help users find the perfect workspace solution
- Collect information naturally through conversation (workspace type, team size, location preference, timeline, contact info)
- Schedule tours and connect users with the team
- Provide accurate information from the knowledge base
- Handle questions about international availability honestly

CONVERSATION STYLE:
- If user asks "cheapest" or "affordable": Mention Virtual Offices ($65/mo) and Hot Desks ($30/hr)
- If user asks "how many" locations: Say we have ${knowledgeBase.locations.length} locations across the US
- If user asks about "2 person" or "2 people": Recommend Dedicated Desks or Private Offices
- If user asks "about yourself": Explain you're the Strive AI assistant and what you can help with
- If user asks about locations in other countries: Politely explain we only operate in the US, mention we have virtual office services
- If user asks a question: Answer it thoroughly using the knowledge base, then naturally ask if they'd like to know more
- If user provides information: Acknowledge it warmly, ask a natural follow-up question if needed
- Don't be robotic - have a real conversation
- Always be honest - if we don't have something, say so clearly
- Always end with a helpful question or suggestion to keep the conversation flowing

${knowledgeContext}

IMPORTANT: 
- Use the knowledge base information accurately
- Be conversational, not scripted
- If collecting info, do it naturally through conversation
- Make it feel like a real AI conversation, not just Q&A
- ALWAYS be accurate about our locations - we ONLY operate in the United States
- ALWAYS answer questions directly - don't ask for more info if you can answer from the knowledge base`;

      const conversationMessages = [
        { role: 'system', content: systemPrompt },
        ...conversationContext.map(msg => ({
          role: msg.role === 'bot' ? 'assistant' : 'user',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: conversationMessages,
          temperature: 0.85,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Grok API error:', response.status, errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Grok API error:', error);
      return null;
    }
  };

  const handleUserMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const userMessage = {
      role: 'user',
      content: userInput
    };

    setMessages(prev => [...prev, userMessage]);
    setShowQuickActions(false);
    setIsTyping(true);

    const intent = detectUserIntent(userInput);
    
    // Update user info if it's an answer
    const updatedInfo = { ...userInfo };
    if (intent.type === 'answer') {
      // Try to extract information
      const input = userInput.toLowerCase();
      if (!updatedInfo.lookingFor) {
        if (input.includes('private office')) updatedInfo.lookingFor = 'Private Office';
        else if (input.includes('coworking') || input.includes('hot desk')) updatedInfo.lookingFor = 'Coworking';
        else if (input.includes('meeting room')) updatedInfo.lookingFor = 'Meeting Room';
      }
      if (!updatedInfo.description) {
        if (input.includes('entrepreneur')) updatedInfo.description = 'Entrepreneur';
        else if (input.includes('remote worker')) updatedInfo.description = 'Remote Worker';
        else if (input.includes('agency')) updatedInfo.description = 'Agency';
        else if (input.includes('team') || input.includes('growing')) updatedInfo.description = 'Growing Team';
      }
      if (!updatedInfo.peopleCount && /\d+/.test(userInput)) {
        const num = parseInt(userInput.match(/\d+/)[0]);
        if (num === 1) updatedInfo.peopleCount = '1';
        else if (num >= 2 && num <= 5) updatedInfo.peopleCount = '2–5';
        else if (num >= 6 && num <= 10) updatedInfo.peopleCount = '6–10';
        else if (num > 10) updatedInfo.peopleCount = '10+';
      }
    }

    setUserInfo(updatedInfo);

    let botResponse = null;

    // Handle show contact request - show contact details immediately
    if (intent.topic === 'show_contact') {
      const contactResponse = getKnowledgeResponse('show_contact');
      if (contactResponse) {
        botResponse = contactResponse;
        setCollectingContact(false);
        setContactStep('email');
      }
    }
    // Handle schedule call/meeting/callback/live person request FIRST (priority) - MAIN GOAL: CAPTURE EMAIL & PHONE
    else if (intent.topic === 'schedule_call' || collectingContact) {
      setCollectingContact(true);
      
      // Check if user provided email (extract from any input)
      const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/;
      const foundEmail = userInput.match(emailRegex);
      
      // Check if user provided phone (extract digits, need at least 10 digits)
      const phoneRegex = /[\d\s\-\(\)]{10,}/;
      const foundPhone = userInput.match(phoneRegex);
      const phoneDigits = foundPhone ? foundPhone[0].replace(/[\s\-\(\)]/g, '') : '';
      const isValidPhone = phoneDigits.length >= 10;
      
      // If we're collecting contact info
      if (collectingContact) {
        // If we need email and user provided it
        if (contactStep === 'email' && foundEmail) {
          updatedInfo.email = foundEmail[0];
          setUserInfo(updatedInfo);
          setContactStep('phone');
          botResponse = `Perfect! I have your email: ${foundEmail[0]}\n\nWhat's your phone number? We'll get back to you shortly to connect you with a live person.`;
        }
        // If we need phone and user provided it
        else if (contactStep === 'phone' && isValidPhone) {
          updatedInfo.phone = foundPhone[0].trim();
          setUserInfo(updatedInfo);
          setCollectingContact(false);
          setContactStep('email');
          setConversationMode('complete');
          botResponse = `Perfect! I have your contact information:\n📧 Email: ${updatedInfo.email}\n📞 Phone: ${updatedInfo.phone}\n\nOur team will get back to you shortly to connect you with a live person. We're excited to help you find your perfect space at Strive Workspaces! 🎉`;
          
          // Submit the data
          const finalData = { ...updatedInfo, requestType: 'schedule_call', timestamp: new Date().toISOString() };
          console.log('✅ Contact info collected for call/meeting:', finalData);
          // TODO: Add API call here to send to backend
          // await fetch('/api/chatbot-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData) });
        }
        // If user provided both email and phone in one message
        else if (foundEmail && isValidPhone && contactStep === 'email') {
          updatedInfo.email = foundEmail[0];
          updatedInfo.phone = foundPhone[0].trim();
          setUserInfo(updatedInfo);
          setCollectingContact(false);
          setContactStep('email');
          setConversationMode('complete');
          botResponse = `Perfect! I have your contact information:\n📧 Email: ${updatedInfo.email}\n📞 Phone: ${updatedInfo.phone}\n\nOur team will get back to you shortly to connect you with a live person. We're excited to help you find your perfect space at Strive Workspaces! 🎉`;
          
          const finalData = { ...updatedInfo, requestType: 'schedule_call', timestamp: new Date().toISOString() };
          console.log('✅ Contact info collected for call/meeting:', finalData);
        }
        // Waiting for email but user didn't provide it - check if they're declining
        else if (contactStep === 'email' && !foundEmail) {
          const declineKeywords = ["don't want", "dont want", "won't", "wont", "can't", "cant", "prefer not", "rather not", "no", "skip", "not interested"];
          const isDeclining = declineKeywords.some(keyword => userInput.toLowerCase().includes(keyword));
          
          if (isDeclining || userInput.toLowerCase().includes('your number') || userInput.toLowerCase().includes('your contact')) {
            // User doesn't want to provide info or is asking for our contact - show contact details
            botResponse = getKnowledgeResponse('show_contact');
            setCollectingContact(false);
            setContactStep('email');
          } else {
            botResponse = `I'd love to schedule a call with you! Please provide your email address so we can contact you.`;
          }
        }
        // Waiting for phone but user didn't provide it - check if they're declining
        else if (contactStep === 'phone' && !isValidPhone) {
          const declineKeywords = ["don't want", "dont want", "won't", "wont", "can't", "cant", "prefer not", "rather not", "no", "skip", "not interested"];
          const isDeclining = declineKeywords.some(keyword => userInput.toLowerCase().includes(keyword));
          
          if (isDeclining || userInput.toLowerCase().includes('your number') || userInput.toLowerCase().includes('your contact')) {
            // User doesn't want to provide info or is asking for our contact - show contact details
            botResponse = getKnowledgeResponse('show_contact');
            setCollectingContact(false);
            setContactStep('email');
          } else {
            botResponse = `Great! Now, what's your phone number? We'll get back to you shortly to connect you with a live person.\n\nPlease provide a valid phone number (at least 10 digits).`;
          }
        }
      }
      // First time asking for schedule call/meeting/callback
      else if (intent.topic === 'schedule_call' && !collectingContact) {
        // Check if they already provided email or phone in the same message
        if (foundEmail && isValidPhone) {
          updatedInfo.email = foundEmail[0];
          updatedInfo.phone = foundPhone[0].trim();
          setUserInfo(updatedInfo);
          setCollectingContact(false);
          setConversationMode('complete');
          botResponse = `Perfect! I have your contact information:\n📧 Email: ${updatedInfo.email}\n📞 Phone: ${updatedInfo.phone}\n\nOur team will get back to you shortly to connect you with a live person. We're excited to help you find your perfect space at Strive Workspaces! 🎉`;
          
          const finalData = { ...updatedInfo, requestType: 'schedule_call', timestamp: new Date().toISOString() };
          console.log('✅ Contact info collected for call/meeting:', finalData);
        }
        else if (foundEmail) {
          updatedInfo.email = foundEmail[0];
          setUserInfo(updatedInfo);
          setContactStep('phone');
          botResponse = `Perfect! I have your email: ${foundEmail[0]}\n\nWhat's your phone number? We'll get back to you shortly to connect you with a live person.`;
        }
        else if (isValidPhone) {
          updatedInfo.phone = foundPhone[0].trim();
          setUserInfo(updatedInfo);
          setContactStep('email');
          botResponse = `Great! I have your phone number: ${updatedInfo.phone}\n\nWhat's your email address? We'll get back to you shortly to connect you with a live person.`;
        }
        else {
          botResponse = `Absolutely! I'd be happy to connect you with a live person. Here's our contact information:\n\n📧 Email: ${knowledgeBase.support.email}\n📞 Phone: ${knowledgeBase.support.phone}\n\nTo help us get back to you quickly, could you please provide your email address?`;
          setCollectingContact(true);
          setContactStep('email');
        }
      }
    }
    // Handle specific questions that need accurate answers - check knowledge base first
    else if (intent.type === 'question' && intent.topic !== 'general') {
      // Try knowledge base first for specific topics
      const knowledgeResponse = getKnowledgeResponse(intent.topic, userInput);
      if (knowledgeResponse) {
        botResponse = knowledgeResponse;
      }
    }

    // Handle specific questions that need accurate answers
    if (intent.type === 'question' && !botResponse && !collectingContact) {
      const input = userInput.toLowerCase();

      // Handle location questions (especially international)
      if (input.includes('pakistan') || input.includes('india') || input.includes('uk') || input.includes('canada') || input.includes('australia') || (input.includes('available') && (input.includes('pakistan') || input.includes('india') || input.includes('country')))) {
        botResponse = `I appreciate your interest! 🌍 Currently, Strive Workspaces operates exclusively in the United States. We have amazing locations across New Jersey, Texas, Tennessee, Michigan, Colorado, and Washington.\n\nHowever, we do offer Virtual Office services that might work for you! This gives you a professional US business address and mail handling services.\n\nWould you like to learn more about our US locations or our Virtual Office services?`;
      }
    }

    // If we still don't have a response and not collecting contact, use Grok API
    if (!botResponse && !collectingContact) {
      const grokResponse = await callGrokAPI(userInput, messages, updatedInfo, intent);
      if (grokResponse) {
        botResponse = grokResponse;
      } else {
        botResponse = "Thanks for sharing that! How can I help you find the perfect workspace?";
      }
    }

    setIsTyping(false);

    const botMessage = {
      role: 'bot',
      content: botResponse
    };
    setMessages(prev => [...prev, botMessage]);

    // Save conversation to backend — pass updatedInfo directly so email/phone
    // are captured even if React state hasn't flushed yet
    if (botResponse) {
      saveConversation(userInput, botResponse, intent.topic || null, updatedInfo.email || null, updatedInfo.phone || null);
    }

    // Show quick actions again after a moment
    setTimeout(() => {
      if (conversationMode !== 'complete') {
        setShowQuickActions(true);
      }
    }, 2000);
  };

  const handleQuickAction = (action) => {
    handleUserMessage(action);
  };

  const handleSubmit = async () => {
    const finalData = { ...userInfo };
    console.log('Form submitted:', finalData);
    
    setIsTyping(true);
    
    const conversationContext = messages;
    const thankYouPrompt = `All information has been collected. The user's name is ${userInfo.name}, email is ${userInfo.email}, and phone is ${userInfo.phone}. They're interested in ${userInfo.lookingFor || 'a workspace'} for ${userInfo.peopleCount || 'their team'} at ${userInfo.location || 'one of our locations'}. Provide a warm, personalized thank you message (2-3 sentences) mentioning that the team will contact them within 24 hours. Be enthusiastic and welcoming.`;
    
    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [
            { role: 'system', content: 'You are a friendly assistant for Strive Workspaces. Provide warm, personalized thank you messages.' },
            { role: 'user', content: thankYouPrompt }
          ],
          temperature: 0.8,
          max_tokens: 150
        })
      });

      if (response.ok) {
        const data = await response.json();
        const grokThankYou = data.choices[0].message.content;
        const thankYouMessage = {
          role: 'bot',
          content: grokThankYou
        };
        setMessages(prev => [...prev, thankYouMessage]);
        setConversationMode('complete');
      } else {
        throw new Error('API error');
      }
    } catch (error) {
      const thankYouMessage = {
        role: 'bot',
        content: `Thank you so much, ${userInfo.name || 'there'}! 🎉 Our team will contact you within 24 hours${userInfo.email ? ` at ${userInfo.email}` : ''}${userInfo.phone ? ` or ${userInfo.phone}` : ''} to discuss your workspace needs and schedule your tour. We're excited to help you find your perfect space at Strive Workspaces!`
      };
      setMessages(prev => [...prev, thankYouMessage]);
      setConversationMode('complete');
    }
    
    setIsTyping(false);
    
    // Send to backend if needed
    // await fetch('/api/chatbot-submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(finalData)
    // });
  };

  if (!isOpen) return null;

  const isComplete = conversationMode === 'complete';

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <h3>🤖 Strive Workspaces AI</h3>
          <button className="chatbot-close" onClick={onClose}>×</button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`${msg.role}-message`}>
              <div className={`message-bubble ${msg.role}`}>
                {msg.content.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="bot-message">
              <div className="message-bubble bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {showQuickActions && !isTyping && !isComplete && (
            <div className="quick-actions">
              <p className="quick-actions-label">Quick questions:</p>
              <div className="quick-actions-buttons">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action)}
                    className="quick-action-btn"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isComplete && !isTyping && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.querySelector('input');
              if (input?.value.trim()) {
                handleUserMessage(input.value.trim());
                input.value = '';
              }
            }} className="chatbot-form">
              <input
                type={collectingContact && contactStep === 'email' ? 'email' : collectingContact && contactStep === 'phone' ? 'tel' : 'text'}
                placeholder={collectingContact && contactStep === 'email' ? 'Enter your email address...' : collectingContact && contactStep === 'phone' ? 'Enter your phone number...' : "Ask me anything or tell me what you're looking for..."}
                className="chatbot-input"
                required
              />
              <button type="submit" className="btn-chat-submit">
                Send
              </button>
            </form>
          )}

          {isComplete && !isTyping && (
            <div className="chatbot-complete">
              <p>Feel free to ask me anything else about Strive Workspaces!</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
