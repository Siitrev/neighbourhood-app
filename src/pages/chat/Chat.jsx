import { PlusCircleIcon, SmileIcon, PaperclipIcon, SendIcon } from '../../components/icons';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../firebase/AuthContext';
import { Link } from 'react-router-dom';
import './Chat.css';

const CHAT_STORAGE_KEY = 'neighbourhood_chat_messages';

const QUICK_EMOJIS = ['😊', '👍', '🙏', '😢', '❤️', '😂', '👋', '✅', '🎉', '🔧', '⚠️', '💡'];

const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    type: 'user',
    text: 'Dzień dobry, chciałem zgłosić że winda w klatce numer 3 nie działa od rana. Utknęła na 4 piętrze.',
    time: '08:42',
  },
  {
    id: 2,
    type: 'admin',
    text: 'Szanowny Panie, informujemy że serwisant został już wezwany i powinien pojawić się w ciągu 2 godzin.',
    time: '09:15',
  },
];

export default function Chat() {
  const { user } = useAuth();

  const [messages, setMessages]               = useState([]);
  const [inputValue, setInputValue]           = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef   = useRef(null);
  const emojiPickerRef = useRef(null);

  const storageKey = user?.uid
    ? `${CHAT_STORAGE_KEY}_${user.uid}`
    : CHAT_STORAGE_KEY;

  useEffect(() => {
    localStorage.setItem('chat_unread_count', '0');
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MESSAGES);
      } catch {
        setMessages(INITIAL_MESSAGES);
      }
    } else {
      setMessages(INITIAL_MESSAGES);
    }
  }, [storageKey]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!showEmojiPicker) return;
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: 'user', text, time: getCurrentTime() },
    ]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emoji) => {
    setInputValue((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setInputValue((prev) => (prev ? `${prev} [${file.name}]` : `[${file.name}]`));
    e.target.value = '';
  };

  return (
    <main className="chat-wrapper">
      <header className="chat-header">
        <h1 className="chat-title">Czat z administracją</h1>
        <nav aria-label="Breadcrumb" className="chat-breadcrumb">
          <Link to="/communication" className="chat-breadcrumb__link">
            Komunikacja
          </Link>
          <span className="chat-breadcrumb__sep" aria-hidden="true">›</span>
          <span className="chat-breadcrumb__current">Skrzynka Odbiorcza</span>
        </nav>
      </header>

      <div className="chat-window">

        {}
        <div className="chat-topbar">
          <div className="chat-topbar__avatar" aria-hidden="true">A</div>
          <span className="chat-topbar__name">Administracja | Biuro Obsługi</span>
        </div>

        {}
        <div className="chat-messages" aria-label="Historia wiadomości" aria-live="polite">
          <div className="chat-date-sep">
            <span>DZISIAJ</span>
          </div>

          {messages.map((msg) =>
            msg.type === 'user' ? (
              <div key={msg.id} className="chat-msg chat-msg--user">
                <div className="chat-msg__bubble chat-msg__bubble--user">
                  {msg.text}
                </div>
                <time className="chat-msg__time chat-msg__time--user" dateTime={msg.time}>
                  {msg.time}
                </time>
              </div>
            ) : (
              <div key={msg.id} className="chat-msg chat-msg--admin">
                <div className="chat-msg__avatar" aria-hidden="true">A</div>
                <div className="chat-msg__admin-content">
                  <span className="chat-msg__sender">ADMINISTRACJA | BIURO OBSŁUGI</span>
                  <div className="chat-msg__bubble chat-msg__bubble--admin">
                    {msg.text}
                  </div>
                  <time className="chat-msg__time chat-msg__time--admin" dateTime={msg.time}>
                    {msg.time}
                  </time>
                </div>
              </div>
            )
          )}

          <div ref={messagesEndRef} />
        </div>

        {}
        <div className="chat-input-bar">

          {}
          <input
            type="file"
            ref={fileInputRef}
            className="chat-file-input"
            onChange={handleFileChange}
            aria-hidden="true"
            tabIndex={-1}
          />

          {}
          <button
            type="button"
            className="chat-input-action"
            aria-label="Załącz plik"
            onClick={() => fileInputRef.current?.click()}
          >
            <PlusCircleIcon width={22} height={22} />
          </button>

          {}
          <input
            type="text"
            className="chat-input"
            placeholder="Wpisz wiadomość..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Pole wiadomości"
          />

          {}
          <div className="chat-emoji-wrap" ref={emojiPickerRef}>
            {showEmojiPicker && (
              <div className="chat-emoji-picker" role="dialog" aria-label="Wybierz emoji">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="chat-emoji-btn"
                    onClick={() => handleEmojiClick(emoji)}
                    aria-label={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              className="chat-input-action"
              aria-label="Emoji"
              aria-expanded={showEmojiPicker}
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <SmileIcon width={20} height={20} />
            </button>
          </div>

          {}
          <button
            type="button"
            className="chat-input-action"
            aria-label="Załącz plik"
            onClick={() => fileInputRef.current?.click()}
          >
            <PaperclipIcon width={20} height={20} />
          </button>

          {}
          <button
            type="button"
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="Wyślij wiadomość"
          >
            <SendIcon width={18} height={18} />
          </button>

        </div>
      </div>
    </main>
  );
}