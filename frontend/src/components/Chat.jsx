import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../services/api';
import Generating from './Generating';
import Section from './Section';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userStr && token) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
        // Redirect to login if user data is invalid
        navigate('/login');
      }
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage);
      
      // Add AI response
      const aiMessage = {
        role: 'assistant',
        content: response.reply || response.message || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: error?.error || 'Sorry, there was an error. Please try again.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null; // Wait for user data to load
  }

  return (
    <Section className="pt-[8rem] min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* User Welcome Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="h1 mb-2">GalaxNova Chat</h1>
            <p className="body-1 text-n-2">
              Welcome back, <span className="text-color-1 font-semibold">{user.username}</span>!
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            className="px-4 py-2 bg-n-7/60 border border-n-6 rounded-xl text-n-2 hover:bg-n-7 hover:text-n-1 transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        {/* Chat Messages */}
        <div className="bg-n-8/80 backdrop-blur-sm rounded-2xl border border-n-6 mb-6 overflow-hidden">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-n-3">
                <p>Start a conversation with GalaxNova...</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-color-1 text-n-8 rounded-tr-sm'
                        : message.isError
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-n-7 text-n-1 rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-n-7 rounded-2xl rounded-tl-sm p-4">
                  <Generating />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex gap-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-2xl px-6 py-4 text-n-1 placeholder-n-3 focus:outline-none focus:border-color-1 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-8 py-4 bg-color-1 text-n-8 rounded-2xl font-code font-semibold uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Chat;

