/** TypeScript hack, should not be needed with TS 5.3 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyStringWithAutocomplete<T extends string> = T | ({} & string);
