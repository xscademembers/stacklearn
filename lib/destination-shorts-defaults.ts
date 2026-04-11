/** Default Shorts links per destination (overridable in admin → Destination videos). */
export const DEFAULT_DESTINATION_SHORT_URLS: Record<string, string> = {
  uk: "https://youtube.com/shorts/2a-ZAmlhc9g?si=S41djVJreL5joPVp",
  usa: "https://youtube.com/shorts/PHlhJrgzG_M?si=46wekJz9Zis-sKZw",
  australia: "https://youtube.com/shorts/FXis_Mc5meQ?si=Lb_XQeVkwp15bPWs",
  canada: "https://youtube.com/shorts/a4BZroFaOlE?si=LsUl_73IzWL35-Vg",
  germany: "https://youtube.com/shorts/-liOZXu3ULY?si=DsEmI8gj1dxFGQqZ",
  ireland: "https://youtube.com/shorts/NDiNENTZp6M?feature=share",
};

export const DESTINATION_SHORT_KEYS = [
  "uk",
  "usa",
  "australia",
  "canada",
  "germany",
  "ireland",
] as const;

export type DestinationShortKey = (typeof DESTINATION_SHORT_KEYS)[number];
