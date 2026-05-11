"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import { withSubmissionContext } from "@/lib/submissionPayload";
import IndiaPhoneInput from "@/components/forms/IndiaPhoneInput";
import DestinationCountryFields from "@/components/forms/DestinationCountryFields";
import {
  countryLabelToDestinationSelect,
  DESTINATION_SELECT_OTHER,
  destinationFieldPayload,
} from "@/lib/destination-form-options";

interface ScholarshipInterestPopupProps {
  isOpen: boolean;
  scholarshipName: string;
  countryLabel: string;
  onContinue: () => void;
}

function initialDestinationForLabel(countryLabel: string) {
  const mapped = countryLabelToDestinationSelect(countryLabel);
  return {
    destinationSelect: mapped || DESTINATION_SELECT_OTHER,
    otherDestinationName: mapped ? "" : countryLabel.trim(),
  };
}

export default function ScholarshipInterestPopup({
  isOpen,
  scholarshipName,
  countryLabel,
  onContinue,
}: ScholarshipInterestPopupProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(() => ({
    name: "",
    email: "",
    mobile: "",
    ...initialDestinationForLabel(countryLabel),
    message: `Interested in ${scholarshipName}`,
  }));

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const destination = destinationFieldPayload(
      formData.destinationSelect,
      formData.otherDestinationName
    );

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          withSubmissionContext(
            {
              name: formData.name,
              email: formData.email,
              mobile: formData.mobile,
              destination,
              message: formData.message,
            },
            pathname,
            "scholarship_interest_popup"
          )
        ),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Unable to submit right now. Please continue to view details.");
        return;
      }

      onContinue();
    } catch (submitError) {
      console.error("Error submitting scholarship lead:", submitError);
      setError("Network error. You can still continue to view scholarship details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <article className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onContinue}
          className="absolute right-4 top-4 rounded-md p-1 text-gray-500 transition-colors hover:text-gray-700"
          aria-label="Close and continue"
        >
          <FiX className="h-5 w-5" />
        </button>

        <header className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Before You View Details</h2>
          <p className="mt-2 text-sm text-gray-600">
            Share your details for guidance on <span className="font-semibold">{scholarshipName}</span> in{" "}
            <span className="font-semibold">{countryLabel}</span>. You can also skip and continue.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-gray-700">
              Full Name *
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-brand"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm text-gray-700">
              Email *
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-brand"
                placeholder="email@example.com"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-gray-700">
              Mobile Number *
              <div className="mt-2">
                <IndiaPhoneInput
                  required
                  value={formData.mobile}
                  onChange={(next) => setFormData({ ...formData, mobile: next })}
                  className="w-full"
                  fieldClassName="[&>span]:py-3 [&>input]:py-3 [&>input]:px-4"
                />
              </div>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country</label>
              <DestinationCountryFields
                selectValue={formData.destinationSelect}
                otherDestinationName={formData.otherDestinationName}
                onSelectChange={(destinationSelect) =>
                  setFormData((prev) => ({ ...prev, destinationSelect }))
                }
                onOtherChange={(otherDestinationName) =>
                  setFormData((prev) => ({ ...prev, otherDestinationName }))
                }
                selectClassName="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-brand"
                otherInputClassName="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-brand"
                emptyOptionLabel="Select a country"
                otherInputId="scholarship-destination-other"
              />
            </div>
          </div>

          {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Submitting..." : "Submit and View Details"}
            </button>
            <button
              type="button"
              onClick={onContinue}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Skip for Now
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}
