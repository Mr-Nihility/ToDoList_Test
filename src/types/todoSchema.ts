import { ZodType, z } from "zod";
import { Todo } from "./todo.types";

export const TodoSchema: ZodType<Partial<Todo>> = z
  .object({
    text: z
      .string()
      .min(5, { message: "Name is too short" })
      .max(100, { message: "Name is too long" }),
    due: z.string().or(z.null()),
    notes: z.string().optional(),
  })
  .required();
