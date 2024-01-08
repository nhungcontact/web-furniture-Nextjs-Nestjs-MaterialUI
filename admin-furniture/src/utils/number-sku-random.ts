export const generateRandomSku = () => {
  const randomSku = Math.floor(Math.random() * 1000000); // Adjust the range as needed
  return String(randomSku).padStart(6, "0"); // Ensure a fixed length, e.g., 6 digits
};
