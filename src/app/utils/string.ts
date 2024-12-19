export const isEmpty = (value: string | null | undefined | number) => {
  return value == null || value.toString().trim().length === 0;
};

export function fuzzySearchRegex(searchInput: string) {
  return new RegExp(
    searchInput
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Normalize diacritics
      .trim()
      .split("")
      .map((x) => {
        if ([" ", "-", "_"].includes(x)) {
          // Matches a sequence of space, hyphen, or underscore as a single space
          return "(?:[ -_]+)?";
        }
        return x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join(".{0,2}") + "(?:[ -_]*)", // Limits wildcard matches, adjust as needed
    "i",
  );
}
