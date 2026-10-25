"use client";
// components/client/ChannelExplorer.tsx

import React, { useState, useRef, useEffect } from "react";
import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { channelPreview } from "../shared/plans";

export function ChannelExplorer() {
  const { lang } = useLang();
  const t = dict[lang];
  const [activeTab, setActiveTab] = useState(0);

  const frame = useRef<number | null>(null);
  useEffect(() => () => { if (frame.current !== null) cancelAnimationFrame(frame.current); }, []);

  return (
    <section id="channels" className="section">
      <div className="sectionHead">
        <h2>{t.channels.title}</h2>
        <p>{t.channels.sub}</p>
      </div>
      <div className="explorerBox">
        <div className="tabs">
          {channelPreview.map((item, i) => (
            <button
              key={item.region}
              className={`tabBtn ${activeTab === i ? "active" : ""}`}
              onClick={() => {
                if (frame.current !== null) cancelAnimationFrame(frame.current);
                frame.current = requestAnimationFrame(() => { setActiveTab(i); frame.current = null; });
              }}
            >
              {item.region}
            </button>
          ))}
        </div>
        <div className="channelList">
          {channelPreview[activeTab].channels.map(ch => (
            <div key={ch} className="channelItem">▶ {ch}</div>
          ))}
          <div className="channelItem more">{t.channels.more}</div>
        </div>
      </div>
    </section>
  );
}
