"use client";

import {
  DESTINATION_COUNTRY_SELECT_OPTIONS,
  DESTINATION_SELECT_OTHER,
} from "@/lib/destination-form-options";

export type DestinationCountryFieldsProps = {
  selectValue: string;
  otherDestinationName: string;
  onSelectChange: (value: string) => void;
  onOtherChange: (value: string) => void;
  selectClassName: string;
  otherInputClassName: string;
  emptyOptionLabel?: string;
  otherFieldLabel?: string;
  otherInputId?: string;
  otherError?: string;
};

export default function DestinationCountryFields({
  selectValue,
  otherDestinationName,
  onSelectChange,
  onOtherChange,
  selectClassName,
  otherInputClassName,
  emptyOptionLabel = "Select a country",
  otherFieldLabel = "Other destination",
  otherInputId = "destination-other-name",
  otherError,
}: DestinationCountryFieldsProps) {
  const showOther = selectValue === DESTINATION_SELECT_OTHER;

  return (
    <div className="space-y-2">
      <select
        value={selectValue}
        onChange={(e) => {
          const v = e.target.value;
          onSelectChange(v);
          if (v !== DESTINATION_SELECT_OTHER) onOtherChange("");
        }}
        className={selectClassName}
        aria-label="Destination country"
      >
        <option value="">{emptyOptionLabel}</option>
        {DESTINATION_COUNTRY_SELECT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {showOther ? (
        <div className="space-y-1">
          <label htmlFor={otherInputId} className="block text-sm font-medium text-slate-700">
            {otherFieldLabel} *
          </label>
          <input
            id={otherInputId}
            type="text"
            name="otherDestinationName"
            required
            value={otherDestinationName}
            onChange={(e) => onOtherChange(e.target.value)}
            className={otherInputClassName}
            placeholder="Enter country name"
            autoComplete="off"
          />
          {otherError ? (
            <p className="text-accent text-sm" role="alert">
              {otherError}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
