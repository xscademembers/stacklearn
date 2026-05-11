/** Select value for "Others" — user must type `otherDestinationName`. */
export const DESTINATION_SELECT_OTHER = "other" as const;

export type DestinationSelectOption = { value: string; label: string };

/** Fixed list for destination country `<select>` fields (includes Ireland & Others). */
export const DESTINATION_COUNTRY_SELECT_OPTIONS: DestinationSelectOption[] = [
  { value: "uk", label: "United Kingdom" },
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "ireland", label: "Ireland" },
  { value: DESTINATION_SELECT_OTHER, label: "Others" },
];

const LABEL_TO_VALUE: Record<string, string> = {
  "united kingdom": "uk",
  uk: "uk",
  "united states": "usa",
  usa: "usa",
  "u.s.": "usa",
  "u.s.a.": "usa",
  canada: "canada",
  australia: "australia",
  germany: "germany",
  ireland: "ireland",
};

/** Maps CMS / display country labels to our select `value`; empty if unknown. */
export function countryLabelToDestinationSelect(label: string): string {
  const key = label.trim().toLowerCase();
  return LABEL_TO_VALUE[key] ?? "";
}

/** Value stored in APIs (`destination`, `preferredCountry`): slug or custom text for Others. */
export function destinationFieldPayload(selectValue: string, otherDestinationName: string): string {
  if (selectValue === DESTINATION_SELECT_OTHER) {
    return otherDestinationName.trim();
  }
  return selectValue.trim();
}

/** Human-readable label for review/summary UI. */
export function formatDestinationDisplay(
  selectValue: string,
  otherDestinationName: string
): string {
  if (selectValue === DESTINATION_SELECT_OTHER) {
    return otherDestinationName.trim() || "Others";
  }
  const opt = DESTINATION_COUNTRY_SELECT_OPTIONS.find((o) => o.value === selectValue);
  return opt?.label ?? selectValue;
}

export function validateDestinationOtherRequired(
  selectValue: string,
  otherDestinationName: string
): string | null {
  if (selectValue !== DESTINATION_SELECT_OTHER) return null;
  if (!otherDestinationName.trim()) {
    return "Please enter your destination country.";
  }
  return null;
}
