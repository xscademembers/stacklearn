"use client";

import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiSave, FiTrash2, FiX } from "react-icons/fi";
import { adminFetch, isAbortOrTimeoutError } from "@/lib/admin-fetch";
import {
  SUCCESS_STORY_COUNTRY_OPTIONS,
  SUCCESS_STORY_COUNTRY_OTHER,
  countryFieldToSelectValue,
  resolveToCanonicalCountry,
} from "@/lib/success-story-country-options";
import {
  SUCCESS_STORY_SERVICE_OPTIONS,
  isSuccessStoryServiceSlug,
} from "@/lib/success-story-service-options";
import {
  SUCCESS_STORY_TEST_PREP_OPTIONS,
  isSuccessStoryTestPrepSlug,
} from "@/lib/success-story-test-prep-options";
import {
  ADMIN_TRAINING_NON_TECHNICAL_COURSES,
  ADMIN_TRAINING_TECHNICAL_COURSES,
  TRAINING_TRACK_OPTIONS,
  computeTrainingDisplayLabel,
  isTrainingTrack,
  isValidTrainingCourseForTrack,
  normalizeTrainingTrack,
  type TrainingTrack,
} from "@/lib/success-story-training-options";
import {
  mainPageCheckboxLabel,
  supportsShowOnMainPageCheckbox,
} from "@/lib/success-story-main-page";
import {
  isVideoSuccessStory,
  parseSuccessStoryMediaType,
  successStoryMetaLine,
  type PublicSuccessStory,
  type SuccessStoryKind,
  type SuccessStoryMediaType,
} from "@/lib/success-story-public";
import { isValidVideoTestimonialUrl } from "@/lib/success-story-video";

type AdminPlacementKind = SuccessStoryKind;

interface SuccessStory {
  _id: string;
  name: string;
  country: string;
  university: string;
  imageUrl: string;
  story: string;
  createdAt: string;
  updatedAt?: string;
  kind?: string;
  serviceSlug?: string;
  testPrepSlug?: string;
  trainingTrack?: string;
  trainingCourseSlug?: string;
  trainingDisplayLabel?: string;
  showOnMainPage?: boolean;
  mediaType?: string;
  videoUrl?: string;
}

function readShowOnMainPageFlag(v: unknown): boolean {
  if (v === true || v === 1) return true;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "on" || s === "yes";
  }
  return false;
}

function normalizeKindFromDoc(raw: unknown): AdminPlacementKind {
  const k = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  if (k === "service") return "service";
  if (k === "test_prep" || k === "test-prep") return "test_prep";
  if (k === "home") return "home";
  if (k === "scholarships" || k === "scholarship") return "scholarships";
  if (k === "training") return "training";
  return "destination";
}

function toPublicSuccessStory(s: SuccessStory): PublicSuccessStory {
  const kind = normalizeKindFromDoc(s.kind);
  const serviceSlug =
    kind === "service" && s.serviceSlug && isSuccessStoryServiceSlug(s.serviceSlug) ? s.serviceSlug : "";
  const testPrepSlug =
    kind === "test_prep" && s.testPrepSlug && isSuccessStoryTestPrepSlug(s.testPrepSlug)
      ? s.testPrepSlug
      : "";
  const trainingTrack = kind === "training" ? normalizeTrainingTrack(s.trainingTrack) : "";
  const trainingCourseSlug =
    kind === "training" && trainingTrack && (trainingTrack === "technical" || trainingTrack === "non_technical")
      ? (s.trainingCourseSlug || "").trim()
      : "";
  const trainingDisplayLabel =
    kind === "training"
      ? (s.trainingDisplayLabel || "").trim() ||
        (trainingTrack
          ? computeTrainingDisplayLabel(trainingTrack as TrainingTrack, trainingCourseSlug)
          : "")
      : "";
  return {
    _id: s._id,
    name: s.name,
    country: s.country,
    university: s.university,
    imageUrl: s.imageUrl,
    story: s.story,
    kind,
    serviceSlug,
    testPrepSlug,
    trainingTrack,
    trainingCourseSlug,
    trainingDisplayLabel,
    showOnMainPage: readShowOnMainPageFlag(s.showOnMainPage),
    mediaType: parseSuccessStoryMediaType(s.mediaType),
    videoUrl: typeof s.videoUrl === "string" ? s.videoUrl : "",
  };
}

function editingRecordKey(editing: Partial<SuccessStory> | null): string | null {
  if (!editing) return null;
  return typeof editing._id === "string" && editing._id ? editing._id : "__new__";
}

const emptyStory: Partial<SuccessStory> = {
  name: "",
  country: "",
  university: "",
  imageUrl: "",
  story: "",
  kind: "destination",
  serviceSlug: "",
  testPrepSlug: "",
  trainingTrack: "",
  trainingCourseSlug: "",
  trainingDisplayLabel: "",
  showOnMainPage: false,
  mediaType: "story",
  videoUrl: "",
};

export default function AdminSuccessStoriesPage() {
  const [items, setItems] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SuccessStory> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");
  const [countryMenu, setCountryMenu] = useState("");
  const [categoryKind, setCategoryKind] = useState<AdminPlacementKind>("destination");
  const [serviceMenu, setServiceMenu] = useState("");
  const [testPrepMenu, setTestPrepMenu] = useState("");
  const [trainingTrackMenu, setTrainingTrackMenu] = useState("");
  const [trainingCourseMenu, setTrainingCourseMenu] = useState("");
  const [mediaTypeMenu, setMediaTypeMenu] = useState<SuccessStoryMediaType>("story");

  const recordKey = editingRecordKey(editing);
  const isVideoForm = mediaTypeMenu === "video";

  useEffect(() => {
    if (recordKey === null) {
      setCountryMenu("");
      setCategoryKind("destination");
      setServiceMenu("");
      setTestPrepMenu("");
      setTrainingTrackMenu("");
      setTrainingCourseMenu("");
      setMediaTypeMenu("story");
      return;
    }
    if (!editing) return;
    setMediaTypeMenu(parseSuccessStoryMediaType(editing.mediaType));
    const k = normalizeKindFromDoc(editing.kind);
    setCategoryKind(k);
    setCountryMenu(countryFieldToSelectValue(editing.country));
    setServiceMenu(
      k === "service" && editing.serviceSlug && isSuccessStoryServiceSlug(editing.serviceSlug)
        ? editing.serviceSlug
        : ""
    );
    setTestPrepMenu(
      k === "test_prep" && editing.testPrepSlug && isSuccessStoryTestPrepSlug(editing.testPrepSlug)
        ? editing.testPrepSlug
        : ""
    );
    setTrainingTrackMenu(k === "training" ? normalizeTrainingTrack(editing.trainingTrack) : "");
    setTrainingCourseMenu(
      k === "training" &&
        (editing.trainingTrack === "technical" || editing.trainingTrack === "non_technical") &&
        editing.trainingCourseSlug
        ? editing.trainingCourseSlug
        : ""
    );
    // Only re-sync when opening the editor or switching records (not on every keystroke).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally omit `editing` identity
  }, [recordKey]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setListError("");
    try {
      const res = await adminFetch("/api/admin/success-stories");
      const data = await res.json();
      if (!res.ok) {
        setListError(typeof data.message === "string" ? data.message : "Could not load success stories.");
        setItems([]);
        return;
      }
      setItems(data.successStories || []);
    } catch (e) {
      setListError(
        isAbortOrTimeoutError(e)
          ? "Request timed out — check MongoDB (MONGODB_URI, Atlas IP list) and restart the server."
          : "Could not load success stories."
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "new") setEditing({ ...emptyStory });
    }
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (!(editing.name || "").trim()) {
      setError("Student name is required.");
      return;
    }
    if (isVideoForm) {
      const url = (editing.videoUrl || "").trim();
      if (!url) {
        setError("Video URL is required for video testimonials.");
        return;
      }
      if (!isValidVideoTestimonialUrl(url)) {
        setError("Enter a valid video URL (YouTube, Vimeo, Loom, or direct mp4/webm link).");
        return;
      }
    } else if (!(editing.story || "").trim()) {
      setError("Story text is required for written success stories.");
      return;
    }
    if (categoryKind === "destination") {
      if (!countryMenu) {
        setError("Select a country, or choose Other and type the country name.");
        return;
      }
      if (countryMenu === SUCCESS_STORY_COUNTRY_OTHER && !(editing.country || "").trim()) {
        setError('When "Other" is selected, enter the country name.');
        return;
      }
    } else if (categoryKind === "service") {
      if (!serviceMenu || !isSuccessStoryServiceSlug(serviceMenu)) {
        setError("Select a service.");
        return;
      }
    } else if (categoryKind === "test_prep") {
      if (!testPrepMenu || !isSuccessStoryTestPrepSlug(testPrepMenu)) {
        setError("Select IELTS, GRE, TOEFL, or GMAT.");
        return;
      }
    } else if (categoryKind === "training") {
      if (!trainingTrackMenu || !isTrainingTrack(trainingTrackMenu)) {
        setError("Select a training category.");
        return;
      }
      if (trainingTrackMenu === "technical" || trainingTrackMenu === "non_technical") {
        if (!trainingCourseMenu || !isValidTrainingCourseForTrack(trainingTrackMenu, trainingCourseMenu)) {
          setError("Select a course for this training category.");
          return;
        }
      }
    }

    const country =
      categoryKind === "destination"
        ? countryMenu === SUCCESS_STORY_COUNTRY_OTHER
          ? (editing.country || "").trim()
          : countryMenu
        : "";
    const serviceSlug = categoryKind === "service" ? serviceMenu : "";
    const testPrepSlug = categoryKind === "test_prep" ? testPrepMenu : "";
    const trainingTrack = categoryKind === "training" ? trainingTrackMenu : "";
    const trainingCourseSlug =
      categoryKind === "training" &&
      (trainingTrackMenu === "technical" || trainingTrackMenu === "non_technical")
        ? trainingCourseMenu
        : "";
    const trainingDisplayLabel =
      categoryKind === "training" && trainingTrackMenu
        ? computeTrainingDisplayLabel(trainingTrackMenu as TrainingTrack, trainingCourseSlug)
        : "";
    const university =
      categoryKind === "destination" && !isVideoForm ? (editing.university || "").trim() : "";
    const basePayload = {
      name: (editing.name || "").trim(),
      mediaType: mediaTypeMenu,
      videoUrl: isVideoForm ? (editing.videoUrl || "").trim() : "",
      story: isVideoForm ? "" : (editing.story || "").trim(),
      imageUrl: isVideoForm ? "" : (editing.imageUrl || "").trim(),
      kind: categoryKind,
      country,
      serviceSlug,
      testPrepSlug,
      trainingTrack,
      trainingCourseSlug,
      trainingDisplayLabel,
      university,
      showOnMainPage:
        supportsShowOnMainPageCheckbox(categoryKind, trainingTrackMenu) &&
        readShowOnMainPageFlag(editing.showOnMainPage),
    };
    const isUpdate = editing._id != null && String(editing._id).trim() !== "";
    const payload = isUpdate ? { ...basePayload, _id: String(editing._id).trim() } : basePayload;

    setSaving(true);
    setError("");
    try {
      const method = isUpdate ? "PUT" : "POST";
      const res = await adminFetch("/api/admin/success-stories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.message === "string" ? data.message : "Failed to save");
        return;
      }
      setEditing(null);
      fetchItems();
    } catch (e) {
      setError(isAbortOrTimeoutError(e) ? "Save timed out — check MongoDB connection." : "Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this success story?")) return;
    try {
      await adminFetch("/api/admin/success-stories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      setListError("Delete failed or timed out.");
    }
    fetchItems();
  };

  if (editing) {
    const showOtherCountry = countryMenu === SUCCESS_STORY_COUNTRY_OTHER;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-foreground">
            {editing._id ? "Edit testimonial" : "New testimonial"}
          </h2>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="p-2 rounded-lg hover:bg-page-soft transition-colors motion-reduce:transition-none"
            aria-label="Close editor"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <section className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="ss-media-type" className="block text-sm font-semibold mb-2">
                Content type
              </label>
              <select
                id="ss-media-type"
                value={mediaTypeMenu}
                onChange={(e) => {
                  const v = e.target.value as SuccessStoryMediaType;
                  setMediaTypeMenu(v);
                  setEditing({
                    ...editing,
                    mediaType: v,
                    ...(v === "video" ? { story: "", imageUrl: "" } : { videoUrl: "" }),
                  });
                }}
                className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
              >
                <option value="story">Written success story</option>
                <option value="video">Video testimonial</option>
              </select>
              <p className="mt-2 text-xs text-foreground-muted">
                Video testimonials need only name, where to show, and a video URL (any aspect ratio).
              </p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ss-name" className="block text-sm font-semibold mb-2">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                id="ss-name"
                type="text"
                value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="ss-category" className="block text-sm font-semibold mb-2">
                Story type
              </label>
              <select
                id="ss-category"
                value={categoryKind}
                onChange={(e) => {
                  const v = e.target.value as AdminPlacementKind;
                  setCategoryKind(v);
                  setCountryMenu("");
                  setServiceMenu("");
                  setTestPrepMenu("");
                  setTrainingTrackMenu("");
                  setTrainingCourseMenu("");
                  setEditing({
                    ...editing,
                    kind: v,
                    country: "",
                    university: "",
                    serviceSlug: "",
                    testPrepSlug: "",
                    trainingTrack: "",
                    trainingCourseSlug: "",
                    trainingDisplayLabel: "",
                    showOnMainPage: false,
                  });
                }}
                className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
              >
                <option value="destination">Destination</option>
                <option value="service">Services</option>
                <option value="test_prep">Test preparation</option>
                <option value="training">Training</option>
                <option value="home">Home page</option>
                <option value="scholarships">Scholarships page</option>
              </select>
            </div>
            {categoryKind === "destination" ? (
              <div>
                <label htmlFor="ss-country" className="block text-sm font-semibold mb-2">
                  Country
                </label>
                <select
                  id="ss-country"
                  value={countryMenu}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "") {
                      setCountryMenu("");
                      setEditing({ ...editing, country: "" });
                      return;
                    }
                    if (v === SUCCESS_STORY_COUNTRY_OTHER) {
                      setCountryMenu(SUCCESS_STORY_COUNTRY_OTHER);
                      const prev = (editing.country || "").trim();
                      const canon = resolveToCanonicalCountry(prev);
                      setEditing({ ...editing, country: canon ? "" : prev });
                      return;
                    }
                    setCountryMenu(v);
                    setEditing({ ...editing, country: v });
                  }}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                >
                  <option value="">Select country…</option>
                  {SUCCESS_STORY_COUNTRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                  <option value={SUCCESS_STORY_COUNTRY_OTHER}>Other (type below)</option>
                </select>
              </div>
            ) : null}
            {categoryKind === "service" ? (
              <div>
                <label htmlFor="ss-service" className="block text-sm font-semibold mb-2">
                  Service
                </label>
                <select
                  id="ss-service"
                  value={serviceMenu}
                  onChange={(e) => {
                    const slug = e.target.value;
                    setServiceMenu(slug);
                    setEditing({ ...editing, serviceSlug: slug });
                  }}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                >
                  <option value="">Select service…</option>
                  {SUCCESS_STORY_SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.slug} value={opt.slug}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            {categoryKind === "test_prep" ? (
              <div>
                <label htmlFor="ss-testprep" className="block text-sm font-semibold mb-2">
                  Test program
                </label>
                <select
                  id="ss-testprep"
                  value={testPrepMenu}
                  onChange={(e) => {
                    const slug = e.target.value;
                    setTestPrepMenu(slug);
                    setEditing({ ...editing, testPrepSlug: slug });
                  }}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                >
                  <option value="">Select exam…</option>
                  {SUCCESS_STORY_TEST_PREP_OPTIONS.map((opt) => (
                    <option key={opt.slug} value={opt.slug}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            {categoryKind === "training" ? (
              <div>
                <label htmlFor="ss-training-track" className="block text-sm font-semibold mb-2">
                  Training category
                </label>
                <select
                  id="ss-training-track"
                  value={trainingTrackMenu}
                  onChange={(e) => {
                    const tr = e.target.value as TrainingTrack | "";
                    setTrainingTrackMenu(tr);
                    setTrainingCourseMenu("");
                    setEditing({
                      ...editing,
                      trainingTrack: tr,
                      trainingCourseSlug: "",
                      trainingDisplayLabel: "",
                      showOnMainPage:
                        supportsShowOnMainPageCheckbox("training", tr) &&
                        readShowOnMainPageFlag(editing.showOnMainPage),
                    });
                  }}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                >
                  <option value="">Select training…</option>
                  {TRAINING_TRACK_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            {categoryKind === "home" || categoryKind === "scholarships" ? (
              <div className="flex items-end min-h-[44px]">
                <p className="text-xs text-foreground-muted leading-relaxed m-0">
                  {categoryKind === "home"
                    ? "Shown on the main home page carousel (no extra selection)."
                    : "Shown on the scholarships page (no extra selection)."}
                </p>
              </div>
            ) : null}
            {categoryKind === "training" &&
            (trainingTrackMenu === "technical" || trainingTrackMenu === "non_technical") ? (
              <div className="sm:col-span-2">
                <label htmlFor="ss-training-course" className="block text-sm font-semibold mb-2">
                  Course
                </label>
                <select
                  id="ss-training-course"
                  value={trainingCourseMenu}
                  onChange={(e) => {
                    const slug = e.target.value;
                    setTrainingCourseMenu(slug);
                    setEditing({ ...editing, trainingCourseSlug: slug });
                  }}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                >
                  <option value="">Select course…</option>
                  {(trainingTrackMenu === "technical"
                    ? ADMIN_TRAINING_TECHNICAL_COURSES
                    : ADMIN_TRAINING_NON_TECHNICAL_COURSES
                  ).map((opt) => (
                    <option key={opt.slug} value={opt.slug}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <p className="sm:col-span-2 text-xs text-foreground-muted leading-relaxed">
              {categoryKind === "destination"
                ? "Destination stories appear on the matching country page. Use Country → Other only if the destination is not listed."
                : categoryKind === "service"
                  ? "Service stories appear on the matching page under Services."
                  : categoryKind === "test_prep"
                    ? "Test prep stories appear on the matching /test-prep/{exam} page."
                    : categoryKind === "training"
                      ? "Technical / non-technical stories appear on each course page. Study abroad and corporate stories appear on those training hubs."
                      : categoryKind === "home"
                        ? "Tag stories you want highlighted on the site home page."
                        : "Tag stories for the main scholarships landing page."}
            </p>
            {categoryKind === "destination" && showOtherCountry ? (
              <div className="sm:col-span-2">
                <label htmlFor="ss-country-other" className="block text-xs font-semibold text-foreground-muted mb-2">
                  Country name (custom)
                </label>
                <input
                  id="ss-country-other"
                  type="text"
                  value={editing.country || ""}
                  onChange={(e) => setEditing({ ...editing, country: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                  placeholder="e.g. France, UAE"
                  autoComplete="off"
                />
              </div>
            ) : null}
            {categoryKind === "destination" && !isVideoForm ? (
              <div className="sm:col-span-2">
                <label htmlFor="ss-university" className="block text-sm font-semibold mb-2">
                  University
                </label>
                <input
                  id="ss-university"
                  type="text"
                  value={editing.university || ""}
                  onChange={(e) => setEditing({ ...editing, university: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                />
              </div>
            ) : null}
            {supportsShowOnMainPageCheckbox(categoryKind, trainingTrackMenu) ? (
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={readShowOnMainPageFlag(editing.showOnMainPage)}
                    onChange={(e) =>
                      setEditing({ ...editing, showOnMainPage: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-brand"
                  />
                  <span className="text-sm text-foreground leading-relaxed">
                    {mainPageCheckboxLabel(categoryKind, trainingTrackMenu)}
                    <span className="block text-xs text-foreground-muted mt-1">
                      When checked, this story also appears on the main listing page for this
                      category (in addition to the specific country, service, exam, or course
                      page).
                    </span>
                  </span>
                </label>
              </div>
            ) : null}
            {isVideoForm ? (
              <div className="sm:col-span-2">
                <label htmlFor="ss-video" className="block text-sm font-semibold mb-2">
                  Video URL <span className="text-red-600">*</span>
                </label>
                <input
                  id="ss-video"
                  type="url"
                  inputMode="url"
                  value={editing.videoUrl || ""}
                  onChange={(e) => setEditing({ ...editing, videoUrl: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                  placeholder="https://www.youtube.com/watch?v=… or direct .mp4 link"
                />
                <p className="mt-2 text-xs text-foreground-muted">
                  YouTube, Vimeo, Loom, or direct mp4/webm. Portrait and landscape are supported.
                </p>
              </div>
            ) : null}
            {!isVideoForm ? (
            <>
            <div className="sm:col-span-2">
              <label htmlFor="ss-image" className="block text-sm font-semibold mb-2">
                Photo URL
              </label>
              <input
                id="ss-image"
                type="url"
                inputMode="url"
                value={editing.imageUrl || ""}
                onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                placeholder="https://example.com/photo.jpg"
              />
              <p className="mt-2 text-xs text-foreground-muted">
                Paste a direct image link. Only http(s) URLs are stored.
              </p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ss-story" className="block text-sm font-semibold mb-2">
                Story (about two lines) <span className="text-red-600">*</span>
              </label>
              <textarea
                id="ss-story"
                rows={2}
                maxLength={400}
                value={editing.story || ""}
                onChange={(e) => setEditing({ ...editing, story: e.target.value })}
                className="w-full px-4 py-3 min-h-[88px] border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface resize-y"
              />
              <p className="mt-2 text-xs text-foreground-muted">{(editing.story || "").length}/400 characters</p>
            </div>
            </>
            ) : null}
          </div>

          {!isVideoForm && editing.imageUrl && /^https?:\/\//i.test(editing.imageUrl.trim()) ? (
            <figure className="rounded-xl border border-border bg-page-soft overflow-hidden p-4">
              <figcaption className="text-xs font-semibold text-foreground-muted mb-3">Preview</figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={editing.imageUrl.trim()}
                alt=""
                className="w-full max-h-56 object-contain rounded-lg bg-surface"
              />
            </figure>
          ) : null}

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 h-11 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60 motion-reduce:transition-none"
            >
              <FiSave className="w-4 h-4" aria-hidden />
              {saving ? "Saving…" : "Save story"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-6 h-11 border border-border rounded-lg font-medium hover:bg-page-soft transition-colors motion-reduce:transition-none"
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {listError ? (
        <div
          className="rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          {listError}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-foreground-muted">{items.length} success stor{items.length === 1 ? "y" : "ies"}</p>
        <button
          type="button"
          onClick={() => setEditing({ ...emptyStory })}
          className="flex items-center gap-2 px-4 h-10 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors motion-reduce:transition-none"
        >
          <FiPlus className="w-4 h-4" aria-hidden />
          New story
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12 text-foreground-muted">Loading…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-xl border border-border">
          <p className="text-foreground-muted mb-4">No success stories yet.</p>
          <button
            type="button"
            onClick={() => setEditing({ ...emptyStory })}
            className="px-4 h-10 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors motion-reduce:transition-none"
          >
            Add first story
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 list-none p-0 m-0">
          {items.map((s) => (
            <li key={s._id}>
              <article className="bg-surface rounded-xl border border-border p-5 h-full flex flex-col gap-4">
                <div className="flex gap-4">
                  {s.imageUrl ? (
                    <div className="w-20 h-20 rounded-lg border border-border overflow-hidden flex-shrink-0 bg-page-soft">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 rounded-lg border border-dashed border-border flex-shrink-0 flex items-center justify-center text-xs text-foreground-muted text-center px-1"
                      aria-hidden
                    >
                      No photo
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm truncate">{s.name}</h3>
                    <p className="text-xs text-foreground-muted mt-1 line-clamp-2">
                      {successStoryMetaLine(toPublicSuccessStory(s))}
                    </p>
                  </div>
                </div>
                <blockquote className="text-sm text-foreground leading-relaxed line-clamp-3 m-0 border-l-2 border-brand pl-3">
                  {s.story}
                </blockquote>
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={() =>
                      setEditing({
                        ...s,
                        showOnMainPage: readShowOnMainPageFlag(s.showOnMainPage),
                      })
                    }
                    className="p-2 rounded-lg hover:bg-page-soft transition-colors motion-reduce:transition-none text-foreground-muted hover:text-brand"
                    title="Edit"
                  >
                    <FiEdit2 className="w-4 h-4" aria-hidden />
                    <span className="sr-only">Edit {s.name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s._id)}
                    className="p-2 rounded-lg hover:bg-page-soft transition-colors motion-reduce:transition-none text-foreground-muted hover:text-red-500"
                    title="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" aria-hidden />
                    <span className="sr-only">Delete {s.name}</span>
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
