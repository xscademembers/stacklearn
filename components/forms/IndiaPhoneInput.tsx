"use client";

import { INDIA_COUNTRY_CODE, normalizeIndianMobile10 } from "@/lib/india-phone";

export type IndiaPhoneInputProps = {
  value: string;
  onChange: (nextDigits: string) => void;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  "aria-describedby"?: string;
};

export default function IndiaPhoneInput({
  value,
  onChange,
  id,
  name,
  required,
  disabled,
  placeholder = "10-digit mobile number",
  className,
  inputClassName,
  "aria-describedby": ariaDescribedBy,
}: IndiaPhoneInputProps) {
  return (
    <div
      className={
        className ??
        "flex items-stretch overflow-hidden rounded-lg border border-border focus-within:ring-2 focus-within:ring-brand focus-within:border-brand transition-all"
      }
    >
      <span className="flex items-center px-3 text-sm font-semibold text-slate-700 bg-page-soft border-r border-border select-none">
        {INDIA_COUNTRY_CODE}
      </span>
      <input
        id={id}
        name={name}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(normalizeIndianMobile10(e.target.value))}
        onPaste={(e) => {
          const pasted = e.clipboardData.getData("text");
          const next = normalizeIndianMobile10(pasted);
          if (next !== pasted) e.preventDefault();
          onChange(next);
        }}
        maxLength={10}
        pattern="\d{10}"
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        className={
          inputClassName ??
          "w-full px-3 py-2 text-sm bg-white outline-none disabled:opacity-60"
        }
      />
    </div>
  );
}

