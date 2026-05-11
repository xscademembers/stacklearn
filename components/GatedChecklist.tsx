"use client";

import { useCallback, useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
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

  /* ── Locked: single CTA (opens enquiry to unlock) ── */
  return (
    <>
      <button
        type="button"
        onClick={() => setPopupOpen(true)}
        className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-sm hover:bg-brand-strong hover:shadow-md motion-reduce:transition-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        aria-label="Get free checklist — opens a short form to unlock the full list"
      >
        Get Free Checklist
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
