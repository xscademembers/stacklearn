"use client";

import { useState } from "react";
import EnquiryPopup from "./EnquiryPopup";

interface BookConsultButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "white";
}

export default function BookConsultButton({ 
  children = "Book Free Counselling", 
  className = "",
  variant = "primary"
}: BookConsultButtonProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const baseStyles = "font-semibold transition-all duration-300 hover:scale-105 transform";
  
  const variantStyles = {
    primary: "px-8 py-4 bg-brand text-white rounded-full hover:shadow-xl hover:shadow-brand/40",
    secondary: "px-8 py-4 border-2 border-brand text-brand rounded-full hover:bg-brand hover:text-white",
    white: "px-8 py-4 bg-white text-brand rounded-full hover:shadow-xl",
  };

  return (
    <>
      <button
        onClick={() => setIsEnquiryOpen(true)}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </button>
      <EnquiryPopup isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </>
  );
}
