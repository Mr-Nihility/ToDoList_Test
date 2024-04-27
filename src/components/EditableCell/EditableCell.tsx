import { CellContext } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Todo } from "../../types/todo.types";
import styles from "./EditableCell.module.scss";

const EditableCell = ({
  getValue,
  row,
  column,
  table,
}: CellContext<Todo, string>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const { updateData } = table.options.meta as {
    updateData: (todo: Todo) => void;
  };
  const onBlur = () => {
    updateData({
      ...table.options.data[row.index],
      [column.id]: value,
      updateAt: new Date().toDateString(),
    });
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      className={styles.input}
      name={column.id}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      type="text"
    />
  );
};
export default EditableCell;
