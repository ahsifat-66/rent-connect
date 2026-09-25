import React, { useState, useEffect, useRef } from 'react';
import { User, ChatMessage } from '../types';
import { backend } from '../services/backend';

interface TenantChatWithOwnerViewProps {
  user: User;
  onBack: () => void;
  onShowToast?: (msg: string) => void;
}

export const TenantChatWithOwnerView: React.FC<TenantChatWithOwnerViewProps> = ({
  user,
  onBack,
  onShowToast
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'Md ABID HASAN SIFAT (Owner)',
      text: 'Assalamu Alaikum Tanvir Bhai! Welcome to Flat 2B. Please let me know if you need anything regarding the flat, utilities, or parking.',
      time: 'Yesterday 10:15 AM',
      isMe: false
    },
    {
      id: 'm2',
      sender: 'Tanvir Ahmed',
      text: 'Walaikum Assalam Sifat Bhai! Everything is great. I paid the March rent via bKash yesterday.',
      time: 'Yesterday 4:30 PM',
      isMe: true
    },
    {
      id: 'm3',
      sender: 'Md ABID HASAN SIFAT (Owner)',
      text: 'Payment received and verified (৳28,000 + service ৳3,500). Official rent receipt slip has been issued in your Financial Engine tab.',
      time: 'Yesterday 4:35 PM',
      isMe: false
    },
    {
      id: 'm4',
      sender: 'Tanvir Ahmed',
      text: 'Thank you! Also, our smart DESCO meter is working smoothly at 52 kWh.',
      time: 'Today 9:20 AM',
      isMe: true
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPills = [
    '📄 Can you confirm my latest rent receipt?',
    '🚰 I reported a bathroom tap issue.',
    '🅿️ Can my guest use parking slot P-14?',
    '⚡ When is the next DESCO recharge cycle?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: user.name || 'Tanvir Ahmed',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputMsg('');

    // Simulate smart landlord response after 1.2s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Received Tanvir Bhai! I will check this right away and update the management team.";
      const lower = text.toLowerCase();

      if (lower.includes('receipt') || lower.includes('rent') || lower.includes('payment')) {
        replyText = "Rent receipt is confirmed and digitally signed! You can download or print the PDF receipt anytime from the Pay tab.";
      } else if (lower.includes('tap') || lower.includes('plumb') || lower.includes('leak') || lower.includes('water')) {
        replyText = "I have instructed Master Rafiq (Emergency Plumber) to check Flat 2B. Gate security clearance is pre-approved.";
      } else if (lower.includes('park') || lower.includes('guest') || lower.includes('car')) {
        replyText = "Sure! Your guest can park at Visitor Bay V-03 near the basement lift. Please issue a Guest QR pass from the Guests tab.";
      } else if (lower.includes('desco') || lower.includes('electric') || lower.includes('meter')) {
        replyText = "DESCO smart meter is live. Current prepaid balance is ৳2,890.00. Automatic low-balance alert is enabled.";
      }

      const replyMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'Md ABID HASAN SIFAT (Owner)',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      };

      setMessages(prev => [...prev, replyMsg]);
      if (onShowToast) {
        onShowToast("💬 New reply from House Owner: Md ABID HASAN SIFAT");
      }
    }, 1300);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] min-h-[560px] w-full max-w-5xl mx-auto bg-white dark:bg-[#161B22] rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden animate-fade-in">
      
      {/* 1. Owner Profile Header */}
      <div className="p-4 bg-gradient-to-r from-[#121632] via-[#1E2348] to-[#121632] text-white flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm active:scale-95 transition-all shrink-0">
            ←
          </button>

          <div className="relative w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-emerald-500 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60"
              alt="Owner"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#121632] rounded-full"></span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm truncate">
                Md ABID HASAN SIFAT
              </h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded">
                👑 Landlord
              </span>
            </div>
            <p className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Online · Gulshan Luxury Tower
            </p>
          </div>
        </div>

        <a
          href="tel:+8801911554433"
          className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center text-sm shadow-md active:scale-95 transition-all shrink-0">
          📞
        </a>
      </div>

      {/* 2. Quick Topic Chips */}
      <div className="p-2.5 bg-slate-50 dark:bg-[#0D1117] border-b border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
        {quickPills.map((pill, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(pill)}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 text-[11px] font-semibold whitespace-nowrap active:scale-95 transition-all shrink-0 shadow-sm">
            {pill}
          </button>
        ))}
      </div>

      {/* 3. Message Thread Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-[#0D1117]/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            
            <div
              className={`max-w-[82%] sm:max-w-[75%] p-3.5 rounded-[22px] text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.isMe
                  ? 'bg-gradient-to-r from-[#00B665] to-[#009E54] text-white rounded-tr-sm'
                  : 'bg-white dark:bg-[#161B22] text-[#111827] dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-tl-sm'
              }`}>
              <p>{msg.text}</p>
            </div>

            <span className="text-[10px] text-slate-400 font-medium mt-1 px-1 flex items-center gap-1">
              <span>{msg.time}</span>
              {msg.isMe && <span className="text-emerald-500 font-bold">✓✓</span>}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200"></span>
            <span className="text-[11px] font-medium">Md ABID HASAN SIFAT is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white dark:bg-[#161B22] border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0">
        
        <button
          type="button"
          onClick={() => {
            if (onShowToast) onShowToast("📎 Attach rent payment slip or photo of flat");
          }}
          className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-base hover:bg-slate-200 active:scale-95 shrink-0">
          📎
        </button>

        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Message Md ABID HASAN SIFAT..."
          className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#0D1117] border border-transparent focus:border-emerald-500 text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputMsg.trim()}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white text-base shadow transition-all shrink-0 active:scale-95 ${
            inputMsg.trim()
              ? 'bg-[#00B665] hover:bg-[#009E54]'
              : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
          }`}>
          ➤
        </button>
      </form>

    </div>
  );
};
