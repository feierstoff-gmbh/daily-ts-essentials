import type React from "react";

/* -------------------------------------------------------------------------- */
/*                             GENERAL TYPESCRIPT                             */
/* -------------------------------------------------------------------------- */
/**
 * Gets the type of a single array element.
 *
 * @example
 * type Item = ArrayItem<string[]>;
 * // Item is now string
 */
export type ArrayItem<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Infers the value type of a record or map.
 */
export type InferValue<TKeyValue> = TKeyValue extends Map<unknown, infer TValue>
  ? TValue
  : TKeyValue extends Record<string, infer TValue>
  ? TValue
  : never;

/**
 * Extends an array with an item of the given type.
 *
 * @example
 * type MyArray = ExtendArray<string[], { foo: string }>;
 * // MyArray is now (string & { foo: string })[]
 */
export type ExtendArray<BaseArray, AppendedObject> = BaseArray extends Iterable<
  infer ArrayItem
>
  ? AppendedObject extends object
    ? (ArrayItem & AppendedObject)[]
    : never
  : never;

/**
 * Infers the type of the resolved value of a Promise.
 *
 * @template T - The type of the Promise.
 * @returns The type of the resolved value of the Promise.
 */
export type InferPromise<T> = T extends Promise<infer U> ? U : never;

/* -------------------------------------------------------------------------- */
/*                                    REACT                                   */
/* -------------------------------------------------------------------------- */
/**
 * Alias for state setter.
 */
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Alias for state tuple.
 */
export type State<T> = [T, SetState<T>];

/* -------------------------------------------------------------------------- */
/*                                   NEXT.JS                                   */
/* -------------------------------------------------------------------------- */
/**
 * Type for query params in URL, usable in page.tsx or layout.tsx.
 *
 * @example
 * export default function Page({ searchParams }: { searchParams: SearchParams }) {
 *  ...
 * }
 */
export type SearchParams = Record<string, string | string[] | undefined>;

/* -------------------------------------------------------------------------- */
/*                                   KYSELY                                   */
/* -------------------------------------------------------------------------- */
/**
 * Helper for getting the return type of a kysely query.
 *
 * @example
 * const query = client.selectFrom("table").select(["table.foo"])
 * type Rows = FetchedRows<typeof query>;
 *
 * // Rows is now { foo: string }[]
 */
export type FetchedRows<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...any: any[]) => { ["expressionType"]: any },
> = NonNullable<ReturnType<T>["expressionType"]>[];

/* -------------------------------------------------------------------------- */
/*                                   CUSTOM                                   */
/* -------------------------------------------------------------------------- */
export type SelectData<T> = T extends {
  data: infer TData;
}
  ? TData
  : never;
