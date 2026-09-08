import React, { useState, useMemo } from 'react';
import { Conversation, User } from '../types';

interface MessengerViewProps {
  conversations: Conversation[];
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  mobileChatThreadOpen: boolean;
  setMobileChatThreadOpen: (open: boolean) => void;
  onSendMessage: (chatId: string, text: string) => void;
  user: User | null;
  lang: 'en' | 'bn';
}

export const MessengerView: React.FC<MessengerViewProps> = ({
  conversations,
  activeChatId,
  setActiveChatId,
  mobileChatThreadOpen,
  setMobileChatThreadOpen,
  onSendMessage,
  lang
}) => {
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [inputMsg, setInputMsg] = useState('');

  // Auto-pin matching unit conversation in Messenger
  const filteredConversations = useMemo(() => {
    if (!chatSearchQuery.trim()) return conversations;
    const q = chatSearchQuery.toLowerCase().trim();
    const matches: Conversation[] = [];
    const nonMatches: Conversation[] = [];
    conversations.forEach(c => {
      if (c.unitNumber.toLowerCase().includes(q) || c.participantName.toLowerCase().includes(q)) {
        matches.push(c);
      } else {
        nonMatches.push(c);
      }
    });
    return [...matches, ...nonMatches];
  }, [conversations, chatSearchQuery]);

  const activeChat = useMemo(() => {
    return conversations.find(c => c.id === activeChatId) || conversations[0];
  }, [conversations, activeChatId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    onSendMessage(activeChat.id, inputMsg.trim());
    setInputMsg('');
  };

  return (
    <div className="card-luxury overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-210px)] min-h-[500px] max-h-[720px] animate-fade-in">
      
      {/* Conversation List Column (Hidden on Mobile when thread is open) */}
      <div className={`md:col-span-4 border-r border-[var(--border-main)] flex flex-col h-full bg-[var(--bg-surface)] ${
        mobileChatThreadOpen ? 'hidden md:flex' : 'flex'
      }`}>
        <div className="p-3.5 border-b border-[var(--border-main)] space-y-2">
          <input 
            type="text"
            value={chatSearchQuery}
            onChange={(e) => setChatSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search Flat (e.g. 4B, 3A)...' : 'ফ্ল্যাট খুঁজুন (৪বি, ৩এ)...'}
            className="w-full px-3.5 py-2 text-xs font-semibold rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {chatSearchQuery && (
            <p className="text-[10px] text-emerald-600 font-bold">Auto-pinned matching unit</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[var(--border-main)]">
          {filteredConversations.map((conv, idx) => (
            <div 
              key={conv.id}
              onClick={() => {
                setActiveChatId(conv.id);
                setMobileChatThreadOpen(true);
              }}
              className={`p-3.5 cursor-pointer flex items-start gap-3 transition-colors ${
                activeChatId === conv.id ? 'bg-emerald-500/10 border-l-4 border-emerald-500' : 'hover:bg-[var(--bg-input)] active:bg-[var(--bg-input)]'
              }`}>
              <img src={conv.avatar} className="w-10 h-10 rounded-2xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-[var(--text-main)] truncate">{conv.participantName}</h4>
                  <span className="text-[10px] text-[var(--text-muted)] shrink-0">{conv.timestamp}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] truncate mt-1">{conv.lastMessage}</p>
                {chatSearchQuery && idx === 0 && (
                  <span className="inline-block text-[9px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full mt-1">
                    PINNED MATCH
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Chat Thread Column (Full Screen on Mobile when open) */}
      <div className={`md:col-span-8 flex flex-col h-full bg-[var(--bg-surface)] ${
        !mobileChatThreadOpen ? 'hidden md:flex' : 'flex'
      }`}>
        {/* Chat Header with Mobile Back Button */}
        <div className="p-3 sm:p-4 border-b border-[var(--border-main)] flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              onClick={() => setMobileChatThreadOpen(false)}
              className="md:hidden p-1.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] font-bold text-xs flex items-center gap-1 active:scale-95 mr-1">
              ←
            </button>

            <img src={activeChat.avatar} className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl object-cover shrink-0" />
            <div className="min-w-0">
              <h4 className="font-extrabold text-xs sm:text-sm text-[var(--text-main)] truncate">{activeChat.participantName}</h4>
              <p className="text-[10px] sm:text-[11px] text-emerald-600 font-medium truncate">Unit {activeChat.unitNumber} · Direct Encrypted Channel</p>
            </div>
          </div>
        </div>

        {/* Chat Message List */}
        <div className="flex-1 p-3.5 sm:p-6 overflow-y-auto space-y-3 bg-[var(--bg-body)]">
          {activeChat.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm ${
                msg.isMe ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-bl-none shadow-sm'
              }`}>
                <p className="break-words">{msg.text}</p>
                <span className={`text-[9px] block mt-1 text-right ${msg.isMe ? 'text-emerald-200' : 'text-[var(--text-muted)]'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-2.5 sm:p-4 bg-[var(--bg-surface)] border-t border-[var(--border-main)]">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input 
              type="text" 
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={lang === 'en' ? 'Type a message...' : 'বার্তা লিখুন...'}
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[var(--text-main)]"
            />
            <button type="submit" className="px-4 py-2.5 bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md hover:bg-emerald-700 active:scale-95">
              {lang === 'en' ? 'Send' : 'পাঠান'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};
