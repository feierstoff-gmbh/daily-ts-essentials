import { z } from "zod";

/**
 * Shortcut for obligatory database id.
 * @returns
 */
function id() {
  return z.coerce.string().min(1);
}

/**
 * Returns a Zod string validator that checks if the input matches the specified regular expression.
 * @param format The regular expression to match against.
 * @param options An object containing options for the validator.
 * @param options.required An optional error message to use if the input is empty or undefined.
 * @param options.invalid The error message to use if the input does not match the regular expression.
 * @returns A Zod string validator.
 */
function regex(
  format: RegExp,
  options: {
    required: string | undefined;
    invalid: string;
  }
) {
  let string = z.string();

  if (options.required) {
    string = string.min(1, { message: options.required });
  }

  return string.regex(format, options.invalid);
}

/**
 * Returns a Zod string validator that matches a date string in the format "YYYY-MM-DD".
 * @param args An optional object containing the following properties:
 * - `required`: A custom error message to use when the value is undefined or an empty string.
 * - `invalid`: A custom error message to use when the value is not a valid date string.
 * @returns A Zod string validator.
 */
function date(args?: { required: string; invalid: string }) {
  return regex(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/, {
    required: args?.required,
    invalid: args?.invalid ?? "Invalid date",
  });
}

/* ------------------------------------ - ----------------------------------- */
type StringToZodLiteral<T extends string> = z.ZodLiteral<T>;

type ReadonlyArrayToZodLiteralTuple<T extends readonly string[]> = {
  [K in keyof T]: StringToZodLiteral<T[K]>;
};

/**
 * Converts a readonly array of string literals to a tuple of Zod literals.
 * @param readonlyArray The readonly array of string literals.
 * @returns A tuple of Zod literals.
 */
function unionFromArray<TArray extends readonly string[]>(
  readonlyArray: TArray
): ReadonlyArrayToZodLiteralTuple<TArray> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  return readonlyArray.map((value) => z.literal(value)) as any;
}
/* ------------------------------------ - ----------------------------------- */

/**
 * Returns null if the given string is empty or whitespace-only, otherwise returns the original string.
 * @param value - The string to nullify.
 * @returns The original string or null.
 */
function nullificate(value: string) {
  if (value.trim() === "") {
    return null;
  }

  return value;
}

/**
 * Returns a Zod object schema for a select option with a label, data, and optional disabled flag.
 * @param dataSchema The Zod schema for the data property of the select option.
 * @param args An optional object containing arguments for the schema.
 * @param args.required The error message to display if the label property is missing.
 * @returns A Zod object schema for a select option.
 */
function selectOption<TSchema extends z.ZodType>(
  dataSchema: TSchema,
  args?: {
    required?: string;
  }
) {
  const object = z.object(
    {
      label: z.string(),
      data: dataSchema,
      disabled: z.boolean().optional(),
    },
    {
      required_error: args?.required ?? "Choose an option",
    }
  );

  return object;
}
/* ------------------------------------ export ----------------------------------- */

export const zod = {
  id,
  regex,
  date,
  unionFromArray,
  nullificate,
  selectOption,
};
