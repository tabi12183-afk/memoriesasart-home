import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type Nullish = null | undefined;
export const nullish = <T>(value: T | Nullish): value is Nullish => value === null || value === undefined;
export const notNullish = <T>(value: T | Nullish): value is T => value !== null && value !== undefined;
