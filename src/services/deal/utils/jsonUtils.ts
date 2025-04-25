
export const parseJsonField = (field: any): Record<string, any> => {
  if (!field) return {};
  
  try {
    if (typeof field === 'string') {
      return JSON.parse(field);
    }
    return field;
  } catch (e) {
    console.error("Error parsing JSON field:", e);
    return {};
  }
};
