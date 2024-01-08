export function jsonForm<T extends Record<string, unknown>>(form: HTMLFormElement) {
  const formData = new FormData(form);
  const jsonData = {} as Record<string, unknown>;
  formData.forEach((value, key) => (jsonData[key] = value));
  return jsonData as T;
}
