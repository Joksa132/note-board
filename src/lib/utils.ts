import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BG_COLORS = [
  "#fef9e7", // Warm cream
  "#fff4e6", // Soft peach
  "#ffe4d6", // Blush
  "#ffeaa7", // Butter yellow
  "#e8dcc4", // Sand beige
  "#d4a574", // Warm amber
  "#c7a882", // Soft tan
  "#b8956a", // Caramel
  "#e6d5c3", // Pale latte
  "#f5e6d3", // Ivory
];

export const TEXT_COLORS = [
  "#2a2419", // Rich charcoal
  "#1a1815", // Deep brown-black
  "#3a3430", // Warm gray
  "#6b5d4f", // Taupe
  "#8b6914", // Golden brown
  "#5a4a3a", // Coffee
  "#4a3f35", // Dark cocoa
  "#a39888", // Light taupe
  "#2d2925", // Dark slate
  "#1f1c18", // Almost black
];
