/**
 * This file contains helper functions that are used throughout the application.
 */

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Rounds a number to a specified number of digits after the decimal point.
 * @param num - The number to round.
 * @param digits - The number of digits after the decimal point to round to. Defaults to 2.
 * @returns The rounded number.
 */
export const round = (num: number, digits = 2) => {
  return (
    Math.round((num + Number.EPSILON) * Math.pow(10, digits)) /
    Math.pow(10, digits)
  );
};

/**
 * Formats a price as a string with an optional euro symbol.
 * @param price - The price to format.
 * @param options - An optional object with a `withEuro` property indicating whether to include the euro symbol.
 * @returns The formatted price as a string.
 */
export const priceAsString = (
  price?: number,
  options?: {
    withEuro?: boolean;
  }
) => {
  if (price === undefined) return "?? €";
  return (
    round(price).toFixed(2).replace(".", ",") + (options?.withEuro ? " €" : "")
  );
};

/**
 * Delays the execution of the function by the specified amount of time.
 * @param ms - The number of milliseconds to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export function sleep(ms = 3000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats a total number of seconds into a string representation of hours, minutes, and seconds.
 * @param totalSeconds - The total number of seconds to format.
 * @returns A string representation of the total number of seconds in the format "HH:MM:SS".
 */
export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Combines multiple class names into a single string. Used for shadcn.
 * @param inputs - An array of class names to combine.
 * @returns A string of combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * This is a hack to get around the fact that TS doesn't allow you to infer a const type.
 * @param array - A readonly array of strings to infer the type from.
 * @param item - The item of the array to return.
 * @param asString - If true, the return type will be a string. Otherwise, it will be the array item constant.
 * @returns The array item constant or a string.
 *
 * @example
 * const array = ["a", "b", "c"] as const;
 * const item = inferConst(array, "b"); // item is "b" with type "b"
 * const item = inferConst(array, "b", true); // item is "b" with type string
 */
export const inferConst = <
  TArray extends readonly string[],
  TKey extends TArray[number],
  TAsString extends boolean = false,
>(
  // @ts-expect-error - Array is only used to infer type, not to be used.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  array: TArray,
  item: TKey,
  // @ts-expect-error - AsString is only used to determine the result type, not to be used.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  asString?: TAsString
): TAsString extends true ? string : TKey => item;
