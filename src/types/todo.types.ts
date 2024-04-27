export type Todo = {
  id: string;
  text: string;
  status: TodoStatus | null;
  due: string | null;
  notes: string;
  cardStatus: CardStatus;
  createAt: string;
  updateAt: string | null;
  deleteAt: string | null;
};

export const enum CardStatus {
  Active = "Active",
  Removed = "Removed",
}

export type TodoStatus = {
  id: number;
  name: string;
  color: string;
};
