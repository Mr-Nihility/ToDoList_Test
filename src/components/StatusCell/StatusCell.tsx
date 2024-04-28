import { Menu } from "@headlessui/react";
import { CellContext } from "@tanstack/react-table";
import { STATUSES } from "../../redux/todo/todoInitialState";
import { Todo, TodoStatus } from "../../types/todo.types";
import styles from "./StatusCell.module.scss";
export const ColorIcon = ({ color, ...props }: { color: string }) => (
  <div
    style={{
      width: "12px",
      height: "12px",
      backgroundColor: color,
      borderRadius: "3px",
    }}
    {...props}
  />
);

const StatusCell = ({
  getValue,
  row,
  table,
}: CellContext<Todo, TodoStatus | null>) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta as {
    updateData: (todo: Todo) => void;
  };
  return (
    <Menu as={"div"} className={styles.statusMenu}>
      <Menu.Button
        as="button"
        className={styles.statusPlaceHolder}
        style={{
          backgroundColor: color || "transparent",
          color: "#fff",
        }}
      >
        {name}
      </Menu.Button>
      <Menu.Items as={"ul"} className={styles.statusMenuList}>
        <Menu.Item
          as={"li"}
          className={styles.statusItem}
          onClick={() =>
            updateData({
              ...table.options.data[row.index],
              status: null,
              updateAt: new Date().toDateString(),
            })
          }
        >
          <ColorIcon color="red" />
          None
        </Menu.Item>
        {STATUSES.map((status) => (
          <Menu.Item
            as={"li"}
            className={styles.statusItem}
            onClick={() => {
              updateData({
                ...table.options.data[row.index],
                status: status,
                updateAt: new Date().toDateString(),
              });
            }}
            key={status.id}
          >
            <ColorIcon color={status.color} />
            {status.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
export default StatusCell;
