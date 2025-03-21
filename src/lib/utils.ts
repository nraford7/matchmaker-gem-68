
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: string | number) {
  if (typeof value === 'string') {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
