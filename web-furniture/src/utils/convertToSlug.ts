export function convertToSlug(text: string): string {
  const mapping: { [key: string]: string } = {
    à: "a",
    á: "a",
    ä: "a",
    â: "a",
    è: "e",
    é: "e",
    ë: "e",
    ê: "e",
    ì: "i",
    í: "i",
    ï: "i",
    î: "i",
    ò: "o",
    ó: "o",
    ö: "o",
    ô: "o",
    ù: "u",
    ú: "u",
    ü: "u",
    û: "u",
    ñ: "n",
    ç: "c",
  };

  return text
    .toLowerCase()
    .replace(/[àáäâèéëêìíïîòóöôùúüûñç]/g, (match) => mapping[match] || match)
    .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric characters with hyphen
    .replace(/--+/g, "-") // Replace consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
