import { CardStatus, Todo, TodoStatus } from "../../types/todo.types";

export const STATUS_ON_DECK: TodoStatus = {
  id: 1,
  name: "On Deck",
  color: "blue",
};
export const STATUS_IN_PROGRESS: TodoStatus = {
  id: 2,
  name: "In Progress",
  color: "yellow",
};
export const STATUS_TESTING: TodoStatus = {
  id: 3,
  name: "Testing",
  color: "pink",
};
export const STATUS_DEPLOYED: TodoStatus = {
  id: 4,
  name: "Deployed",
  color: "green",
};
export const STATUSES: TodoStatus[] = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
];

const DATA: Todo[] = [
  {
    id: "1",
    text: "Add a New Feature",
    status: STATUS_ON_DECK,
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
