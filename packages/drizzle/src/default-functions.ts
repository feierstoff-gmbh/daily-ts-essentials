import { createId } from "@paralleldrive/cuid2";

export const cuid = () => createId();
export const now = () => new Date();
export const uuid = () => crypto.randomUUID();
