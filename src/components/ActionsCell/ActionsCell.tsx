import { CellContext } from "@tanstack/react-table";
import { AiOutlineDelete } from "react-icons/ai";
import { CardStatus, Todo } from "../../types/todo.types";
import styles from "./ActionsCell.module.scss";

function ActionsCell({ row, table }: CellContext<Todo, unknown>) {
  const { updateData } = table.options.meta as {
    updateData: (todo: Todo) => void;
  };
  return (
    <div
      className={styles.actionsBox}
      onClick={() => {
        updateData({
          ...table.options.data[row.index],
          cardStatus: CardStatus.Removed,
          deleteAt: new Date().toDateString(),
        });
      }}
    >
      <AiOutlineDelete />
    </div>
  );
}

export default ActionsCell;
