"use client";

import { useCallback, useEffect, useState } from "react";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import EnquiryPopup from "./EnquiryPopup";

interface GatedChecklistProps {
  slug: string;
  items: string[];
}

function storageKey(slug: string) {
  return `checklist_unlocked_${slug}`;
}

export default function GatedChecklist({ slug, items }: GatedChecklistProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey(slug)) === "1") {
        setUnlocked(true);
      }
    } catch {
      /* storage unavailable */
    }
  }, [slug]);

  const handleSuccess = useCallback(() => {
    setUnlocked(true);
    try {
      localStorage.setItem(storageKey(slug), "1");
    } catch {
      /* storage unavailable */
    }
  }, [slug]);

  const handlePopupClose = useCallback(() => {
    setPopupOpen(false);
  }, []);

  if (items.length === 0) return null;

  /* ── Unlocked: show checklist ── */
  if (unlocked) {
    return (
      <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
            <FiCheckCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-green-900">
            Your Checklist
          </h3>
        </div>
        <ul className="space-y-3 pl-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-800">
              <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                ✓
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ── Locked: show gate ── */
  return (
    <>
      <button
        type="button"
        onClick={() => setPopupOpen(true)}
        className="group w-full rounded-2xl border-2 border-dashed border-brand/30 bg-gradient-to-br from-brand/5 via-brand/10 to-purple-100/40 p-8 md:p-10 text-center transition-all duration-300 hover:border-brand/60 hover:shadow-lg hover:shadow-brand/10 hover:scale-[1.01] cursor-pointer"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors">
            <FiLock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              🔓 Unlock Final Checklist
            </h3>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Get the complete checklist for free — just share your details so
              our counsellors can assist you better.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full font-semibold text-sm group-hover:shadow-lg group-hover:shadow-brand/40 transition-all">
            Get Free Checklist
          </span>
        </div>
      </button>

      <EnquiryPopup
        isOpen={popupOpen}
        onClose={handlePopupClose}
        onSuccess={handleSuccess}
        formSource="blog_checklist_gate"
      />
    </>
  );
}
