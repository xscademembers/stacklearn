"use client";

import dynamic from "next/dynamic";

const ChatWindow = dynamic(() => import("@/components/ChatWindow"), {
  ssr: false,
});
const DynamicScrollUpdates = dynamic(
  () => import("@/components/DynamicScrollUpdates"),
  { ssr: false }
);
const LeadsPopup = dynamic(() => import("@/components/LeadsPopup"), {
  ssr: false,
});

export default function GlobalClientWidgets() {
  return (
    <>
      <DynamicScrollUpdates />
      <ChatWindow />
      <LeadsPopup />
    </>
  );
}
