import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BG_COLORS = [
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "blue",
  "cyan",
  "teal",
  "green",
  "gray",
];

export const TEXT_COLORS = [
  "black",
  "white",
  "slate",
  "gray",
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "pink",
];
