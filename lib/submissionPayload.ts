/**
 * Attach routing context for MongoDB (which page / which widget submitted the form).
 */
export function withSubmissionContext<T extends object>(
  payload: T,
  pathname: string | null,
  formSource: string
): T & { submittedFromPath: string; formSource: string } {
  const path =
    pathname && pathname.length > 0 ? pathname : "/";
  return {
    ...payload,
    submittedFromPath: path,
    formSource,
  };
}
