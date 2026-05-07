"use client";
// components/client/LeratoChat.tsx
// Lerato — trilingual support chat (EN / AF / FR).

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { generateWhatsAppLink, getBotReply } from "../shared/utils";
import type { Msg } from "../shared/types";

export function LeratoChat() {
  const { lang } = useLang();
  const t = dict[lang];
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showQuick, setShowQuick] = useState(false);
  const [ua, setUA] = useState("");
  const msgsEndRef = useRef<HTMLDivElement | null>(null);

  // Clean SVG avatar (no external image risk)
  const Avatar = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "50%", background: "#7C0A18" }}>
      <defs>
        <linearGradient id="avBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C30B1E" />
          <stop offset="1" stopColor="#7C0A18" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="20" fill="url(#avBg)" />
      <circle cx="20" cy="16" r="6" fill="#FFD96A" />
      <path d="M 8 36 Q 8 26 20 26 Q 32 26 32 36 Z" fill="#FFD96A" />
      <text x="20" y="22" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7C0A18">L</text>
    </svg>
  );

  useEffect(() => { setUA(navigator.userAgent); }, []);

  const pushBot = async (text: string, delay = 900) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setMsgs(prev => [...prev, { from: "bot", text }]);
    setIsTyping(false);
  };

  useEffect(() => {
    try { if (localStorage.getItem("chatDismissed") === "true") setDismissed(true); } catch {}
  }, []);

  useEffect(() => {
    if (msgs.length > 0) msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (msgs.filter(m => m.from === "bot").length >= 2) setShowQuick(true);
  }, [msgs, isTyping]);

  useEffect(() => { if (open) setUnread(0); }, [open]);

  useEffect(() => {
    if (dismissed || msgs.length > 0) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    try { if (sessionStorage.getItem("mz_chat_greeted") === "1") return; } catch {}

    const tm = window.setTimeout(() => {
      pushBot(t.bot.greeting1, 0).then(() => pushBot(t.bot.greeting2, 1200));
      setUnread(2);
      try { sessionStorage.setItem("mz_chat_greeted", "1"); } catch {}
    }, 4500);
    return () => window.clearTimeout(tm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed, msgs.length]);

  const handleOpen = () => {
    setOpen(true);
    setDismissed(false);
    try { localStorage.removeItem("chatDismissed"); } catch {}
  };

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
    try { localStorage.setItem("chatDismissed", "true"); } catch {}
  };

  const handleToggle = () => (open ? handleClose() : handleOpen());

  const doSend = async (val: string) => {
    if (!val.trim() || isTyping) return;
    setMsgs(prev => [...prev, { from: "user", text: val }]);
    setInput("");
    setShowQuick(false);
    const replies = getBotReply(val, t.bot as unknown as { [k: string]: string });
    for (const r of replies) await pushBot(r, 700);
    window.setTimeout(() => {
      window.open(generateWhatsAppLink(`Hi! ${val}`, ua, "Lerato-Chat"), "_blank");
    }, 1200);
  };

  const teaserMsgs = useMemo(() => {
    const bots = msgs.filter(m => m.from === "bot");
    return bots.slice(Math.max(0, bots.length - 3));
  }, [msgs]);

  return (
    <>
      {!open && !dismissed && teaserMsgs.length > 0 && (
        <button className="miliTeaser" onClick={handleOpen} aria-label="Open chat">
          <div className="miliTeaserHead">
            <Avatar size={22} />
            <span className="miliTeaserTitle">{t.bot.name} · Support</span>
            {unread > 0 && <span className="miliBadge">{unread}</span>}
          </div>
          <div className="miliTeaserLines">
            {teaserMsgs.map((m, i) => <div key={i} className="miliTeaserLine">{m.text}</div>)}
          </div>
        </button>
      )}

      <button className="miliFab" onClick={handleToggle} aria-label={`Chat with ${t.bot.name}`}>
        <div className="fabContent">
          <Avatar size={35} />
          <span className="fabPulse" />
          <span className="fabText">Support</span>
          {unread > 0 && <span className="miliBadge miliBadgeFab">{unread}</span>}
        </div>
      </button>

      {open && (
        <div className="miliBox" role="dialog" aria-label={`Chat with ${t.bot.name}`}>
          <div className="miliHeader">
            <div className="headerAvatarWrapper">
              <Avatar size={40} />
              <span className="onlineIndicator" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: "14px" }}>{t.bot.name} · Support</div>
              <div style={{ fontSize: "11px", color: "#25d366", fontWeight: 600 }}>
                {isTyping ? t.bot.typing : t.bot.online}
              </div>
            </div>
            <button className="miliClose" onClick={handleClose} aria-label="Close chat">✕</button>
          </div>

          <div className="miliBody">
            <div className="miliMsgs">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === "bot" ? "miliMsgBot" : "miliMsgUser"}>{m.text}</div>
              ))}
              <div ref={msgsEndRef} />
            </div>

            {isTyping && (
              <div className="typingIndicator"><span>.</span><span>.</span><span>.</span></div>
            )}

            {showQuick && !isTyping && (
              <div className="quickReplies">
                {t.bot.quick.map(q => (
                  <button key={q} className="quickReply" onClick={() => doSend(q)}>{q}</button>
                ))}
              </div>
            )}

            <div className="miliInputRow">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && doSend(input)}
                placeholder="Type a message..."
              />
              <button onClick={() => doSend(input)} aria-label="Send">→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
