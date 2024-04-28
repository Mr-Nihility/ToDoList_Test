import { CardStatus, Todo, TodoStatus } from "../../types/todo.types";

export const STATUS_PENDING: TodoStatus = {
  id: 1,
  name: "Pending",
  color: "#068DA9",
};
export const STATUS_IN_PROGRESS: TodoStatus = {
  id: 2,
  name: "In Progress",
  color: "#FFC55A",
};

export const STATUS_DONE: TodoStatus = {
  id: 3,
  name: "Done",
  color: "#41B06E",
};

export const STATUSES: TodoStatus[] = [
  STATUS_PENDING,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
];

const DATA: Todo[] = [
  {
    id: "1",
    text: "Add a New Feature",
    status: STATUS_PENDING,
    due: new Date("2024/10/15").toDateString(),
    notes: "This is a note",
    cardStatus: CardStatus.Active,
    createAt: new Date("2024/10/10").toDateString(),
    updateAt: null,
    deleteAt: null,
  },
  {
    id: "2",
    text: "Write Integration Tests",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Use Jest",
    cardStatus: CardStatus.Active,
    createAt: new Date("2024/10/10").toDateString(),
    updateAt: null,
    deleteAt: null,
  },
  {
    id: "3",
    text: "Refine User Permission System",
    status: null,
    due: new Date("2025/09/18").toDateString(),
    notes: "Enhance permissions.",
    cardStatus: CardStatus.Active,
    createAt: new Date("2024/09/10").toDateString(),
    updateAt: null,
    deleteAt: null,
  },
];

export default DATA;
