const capitalize = (str: string): string => {
  if (!str) return '';
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

export default capitalize;
