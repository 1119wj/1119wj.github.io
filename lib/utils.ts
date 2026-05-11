type ClassValue = string | number | null | undefined | false;

export const cn = (...inputs: ClassValue[]) =>
  inputs.filter(Boolean).join(" ");
