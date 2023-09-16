export const toCamelCase = (str: string) =>
  str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
    +match === 0 ? '' : index === 0 ? match.toLowerCase() : match.toUpperCase()
  );
