export const normalizeString = (text: string) => {
  const removeAccentsRegex = /[\u0300-\u036f]/g;

  return text?.toLowerCase().normalize('NFD').replace(removeAccentsRegex, '');
};
