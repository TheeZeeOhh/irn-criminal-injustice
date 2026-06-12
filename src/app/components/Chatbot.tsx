'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';
import styles from './Chatbot.module.css';

const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? '';

const SYSTEM_PROMPT = `You are the IRN Assistant — a helpful AI for the Injustice Reform Network (IRN), a civil rights organization based in Hampton Roads, Virginia.

Your role is to help community members with:
- Understanding what IRN does and how to get help
- Know Your Rights (police encounters, CPS/family policing, school discipline, tenant rights)
- How to use CHRT (Community Harm Reporting Tool) to report harm anonymously and securely
- IRN programs: Criminal Justice Reform, Environmental Justice, Family Policing, Homelessness Prevention
- Hampton Roads resources: legal aid, shelters, community organizations
- Understanding the criminal justice system: charges, court process, rights if arrested

Rules:
- You are NOT a lawyer. Always clarify this on legal questions and suggest Virginia Legal Aid: 1-866-534-5243.
- Be warm, direct, and accessible. Many users are in crisis or navigating trauma.
- Keep responses concise — 2-4 short paragraphs max.
- For urgent safety situations, direct users to call 911 or a crisis line.
- For harm reporting, direct users to /chrt on the IRN site.
- Never speculate about specific ongoing cases or accuse named individuals.`;

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const WELCOME = `Hi — I'm the IRN assistant. I can help with:

• What IRN does and how to get help
• Know Your Rights (police encounters, CPS, school discipline)
• How to use CHRT to report harm anonymously
• IRN programs: criminal justice, environmental, family policing
• Hampton Roads resources and next steps

What do you need?`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const next: Message[] = [...messages, { role: 'user', text }];
    setMessages(next);
    setLoading(true);
    try {
      if (!GEMINI_KEY) {
        setMessages([...next, { role: 'assistant', text: 'The AI assistant is not configured yet. Please contact IRN directly at the contact page.' }]);
        return;
      }
      const contents = next
        .filter((m) => !(m.role === 'assistant' && m.text.startsWith('Hi —')))
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
          }),
        }
      );
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I had trouble responding. Try again.';
      setMessages([...next, { role: 'assistant', text: reply }]);
    } catch {
      setMessages([...next, { role: 'assistant', text: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        className={styles.fab}
        onClick={() => setOpen(true)}
        aria-label="Open IRN assistant"
        style={{ display: open ? 'none' : 'flex' }}
      >
        <MessageCircle size={24} />
        <span className={styles.fabLabel}>Ask IRN</span>
      </button>

      {/* Chat window */}
      {open && (
        <div className={styles.window} role="dialog" aria-label="IRN Assistant" aria-modal="true">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.headerDot} aria-hidden="true" />
              <span className={styles.headerTitle}>IRN Assistant</span>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages} role="log" aria-live="polite" aria-label="Conversation">
            {messages.map((m, i) => (
              <div key={i} className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}>
                {m.text.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            ))}
            {loading && (
              <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.bubbleLoading}`}>
                <Loader size={14} className={styles.spinner} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <textarea
              ref={inputRef}
              className={styles.input}
              placeholder="Ask a question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              aria-label="Your message"
            />
            <button
              className={styles.sendBtn}
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
          <p className={styles.disclaimer}>
            Not legal advice. For urgent matters use <a href="/irn-criminal-injustice/chrt" className={styles.disclaimerLink}>CHRT</a>.
          </p>
        </div>
      )}
    </>
  );
}
