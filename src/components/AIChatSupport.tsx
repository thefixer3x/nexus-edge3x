import React, { useState, useEffect, useRef } from 'react';
import {
  SMEButton,
  SMECard,
  SMECardContent,
  SMECardHeader,
  SMEInput
} from '@/components/sme';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  MoreVertical,
  ShoppingCart,
  Info,
  Star,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  productSuggestion?: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
  };
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export const AIChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "Hello! I'm your AI business assistant. I can help you find the perfect products for your business needs, answer questions about specifications, pricing, and provide personalized recommendations. How can I assist you today?",
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick actions for common tasks
  const quickActions: QuickAction[] = [
    {
      id: 'product-search',
      label: 'Find Products',
      icon: <ShoppingCart className="w-4 h-4" />,
      action: () => handleQuickMessage("I'm looking for business products")
    },
    {
      id: 'specifications',
      label: 'Product Info',
      icon: <Info className="w-4 h-4" />,
      action: () => handleQuickMessage("Can you help me understand product specifications?")
    },
    {
      id: 'recommendations',
      label: 'Get Recommendations',
      icon: <Star className="w-4 h-4" />,
      action: () => handleQuickMessage("What products do you recommend for my business?")
    }
  ];

  const handleQuickMessage = (message: string) => {
    setInputMessage(message);
    handleSendMessage(message);
  };

  const generateAIResponse = async (userMessage: string): Promise<ChatMessage> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let productSuggestion = undefined;

    // Context-aware responses
    if (lowerMessage.includes('laptop') || lowerMessage.includes('computer') || lowerMessage.includes('desktop')) {
      response = "I'd recommend our Dell OptiPlex 7090 Business Desktop - it's perfect for professional environments with Intel Core i7, 16GB RAM, and enterprise security features. It's currently on sale for $1,299.99!";
      productSuggestion = {
        id: '1',
        name: 'Dell OptiPlex 7090 Business Desktop',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400',
        rating: 4.8
      };
    } else if (lowerMessage.includes('chair') || lowerMessage.includes('ergonomic') || lowerMessage.includes('office furniture')) {
      response = "For ergonomic office seating, I highly recommend the Herman Miller Aeron Chair. It features PostureFit SL technology, breathable mesh design, and a 12-year warranty. It's an investment in your team's health and productivity.";
      productSuggestion = {
        id: '2',
        name: 'Herman Miller Aeron Ergonomic Office Chair',
        price: 1395.00,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        rating: 4.9
      };
    } else if (lowerMessage.includes('printer') || lowerMessage.includes('print') || lowerMessage.includes('scan')) {
      response = "The HP LaserJet Pro MFP M428fdw is excellent for businesses. It offers wireless printing, scanning, copying, and faxing with advanced security features. Currently 18% off at $329.99!";
      productSuggestion = {
        id: '3',
        name: 'HP LaserJet Pro MFP M428fdw Wireless Printer',
        price: 329.99,
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400',
        rating: 4.6
      };
    } else if (lowerMessage.includes('desk') || lowerMessage.includes('standing') || lowerMessage.includes('workspace')) {
      response = "Consider the UPLIFT V2 Standing Desk - it promotes health and productivity with memory presets and a 15-year warranty. Perfect for creating a modern, healthy workspace.";
      productSuggestion = {
        id: '4',
        name: 'UPLIFT V2 Standing Desk 60" x 30"',
        price: 699.99,
        image: 'https://images.unsplash.com/photo-1631889993959-41b4c3c4bf81?w=400',
        rating: 4.9
      };
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = "I can help you find products within your budget! Our selection ranges from affordable office supplies starting at $89.99 to premium equipment. What's your budget range and what type of products are you looking for?";
    } else if (lowerMessage.includes('recommendation') || lowerMessage.includes('suggest') || lowerMessage.includes('help me choose')) {
      response = "I'd be happy to provide personalized recommendations! To give you the best suggestions, could you tell me: \n\n• What type of business do you have?\n• How many employees?\n• What's your primary need (productivity, comfort, technology)?\n• Any specific budget considerations?";
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      response = "Most of our products offer free shipping with estimated delivery in 2-5 business days. Premium items may take 7-14 days. We also offer expedited shipping for urgent needs. Would you like me to check shipping details for a specific product?";
    } else if (lowerMessage.includes('warranty') || lowerMessage.includes('support')) {
      response = "Our products come with comprehensive warranties ranging from 1-15 years depending on the item. We also provide professional support and installation services. What specific product are you interested in learning about?";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = "Hello! Great to chat with you. I'm here to help you find the perfect business solutions. Are you looking for office equipment, furniture, technology, or something specific for your business?";
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      response = "You're very welcome! I'm always here to help with your business needs. Is there anything else I can assist you with today?";
    } else {
      response = "That's a great question! I'm here to help you find the best business products and solutions. Could you tell me more about what you're looking for? I can provide detailed information about our computers, office furniture, printers, and other professional equipment.";
    }

    return {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
      productSuggestion
    };
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Generate AI response
    try {
      const aiResponse = await generateAIResponse(text);
      setMessages(prev => [...prev, aiResponse]);

      // Show notification if chat is closed
      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <SMEButton
          variant="primary"
          size="lg"
          className={cn(
            "rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
            hasNewMessage && "animate-pulse"
          )}
          onClick={handleOpen}
        >
          <MessageCircle className="w-6 h-6 mr-2" />
          {hasNewMessage ? 'New Message' : 'Chat Support'}
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          )}
        </SMEButton>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <SMECard
        className={cn(
          "w-96 shadow-2xl transition-all duration-300",
          isMinimized ? "h-16" : "h-[500px]"
        )}
      >
        {/* Header */}
        <SMECardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-sme-primary to-sme-secondary text-white rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI Business Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={handleMinimize}
              className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </SMECardHeader>

        {!isMinimized && (
          <SMECardContent className="flex flex-col h-[420px] p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="animate-slide-up">
                  <div className={cn(
                    "flex items-start space-x-2",
                    message.isUser ? "justify-end" : "justify-start"
                  )}>
                    {!message.isUser && (
                      <div className="w-8 h-8 bg-sme-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-sme-primary" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2",
                      message.isUser
                        ? "bg-sme-primary text-white"
                        : "bg-sme-neutral-100 text-sme-neutral-900"
                    )}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 bg-sme-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-sme-secondary" />
                      </div>
                    )}
                  </div>

                  {/* Product Suggestion */}
                  {message.productSuggestion && (
                    <div className="ml-10 mt-2">
                      <div className="bg-white border border-sme-neutral-200 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <img
                            src={message.productSuggestion.image}
                            alt={message.productSuggestion.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-sme-neutral-900 line-clamp-1">
                              {message.productSuggestion.name}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-bold text-sme-primary">
                                ${message.productSuggestion.price.toFixed(2)}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-sme-accent fill-current" />
                                <span className="text-xs text-sme-neutral-600">
                                  {message.productSuggestion.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <SMEButton variant="outline" size="sm" className="w-full mt-2">
                          View Product
                        </SMEButton>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-sme-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-sme-primary" />
                  </div>
                  <div className="bg-sme-neutral-100 rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-1">
                      <Loader2 className="w-4 h-4 animate-spin text-sme-primary" />
                      <span className="text-sm text-sme-neutral-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-sme-neutral-200">
                <p className="text-xs text-sme-neutral-600 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex items-center space-x-1 px-2 py-1 bg-sme-neutral-100 hover:bg-sme-neutral-200 rounded-md text-xs text-sme-neutral-700 transition-colors duration-200"
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-sme-neutral-200">
              <div className="flex space-x-2">
                <SMEInput
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <SMEButton
                  variant="primary"
                  size="md"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </SMEButton>
              </div>
            </div>
          </SMECardContent>
        )}
      </SMECard>
    </div>
  );
};
