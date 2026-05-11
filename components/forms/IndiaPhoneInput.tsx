"use client";

import { useId } from "react";
import { INDIA_COUNTRY_CODE, normalizeIndianMobile10 } from "@/lib/india-phone";

export type IndiaPhoneInputProps = {
  value: string;
  onChange: (nextDigits: string) => void;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  /** Optional helper under the field; default hidden so layout matches other inputs. */
  hint?: string | null;
  invalid?: boolean;
  className?: string;
  fieldClassName?: string;
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
  hint = null,
  invalid = false,
  className,
  fieldClassName = "",
  inputClassName = "",
  "aria-describedby": ariaDescribedByProp,
}: IndiaPhoneInputProps) {
  const reactId = useId();
  const hintId = `${reactId}-phone-hint`;
  const showHint = hint != null && hint.length > 0;
  const describedBy =
    [ariaDescribedByProp, showHint ? hintId : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={[showHint ? "w-full space-y-1.5" : "w-full", className].filter(Boolean).join(" ")}
    >
      <div
        className={[
          "flex w-full min-h-0 items-stretch overflow-hidden rounded-lg border border-border bg-surface text-sm",
          "transition-all motion-safe:transition-all",
          invalid
            ? "border-accent focus-within:border-brand focus-within:ring-2 focus-within:ring-brand motion-reduce:focus-within:ring-0"
            : "focus-within:border-brand focus-within:ring-2 focus-within:ring-brand motion-reduce:focus-within:ring-0",
          disabled ? "opacity-60" : "",
          fieldClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span
          className="flex shrink-0 items-center border-r border-border px-3 py-2 text-sm font-semibold tabular-nums text-foreground select-none"
          aria-hidden="true"
        >
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
          aria-describedby={describedBy}
          className={[
            "min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-foreground outline-none ring-0",
            "placeholder:text-foreground-muted",
            "focus:ring-0 disabled:cursor-not-allowed",
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>
      {showHint ? (
        <p id={hintId} className="px-1 text-xs text-foreground-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
