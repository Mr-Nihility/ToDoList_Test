import { Popover } from "@headlessui/react";
import { ColumnFilter } from "@tanstack/react-table";
import { STATUSES } from "../../redux/todo/todoInitialState";
import { TodoStatus } from "../../types/todo.types";
import FilterIcon from "../Icons/FilterIcon";
import { ColorIcon } from "../StatusCell/StatusCell";
import styles from "./FilterPopover.module.scss";
interface StatusItemProps {
  status: TodoStatus;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
  isActive: boolean;
}

const StatusItem = ({
  status,
  setColumnFilters,
  isActive,
}: StatusItemProps) => (
  <div
    className={styles.statusItem}
    style={{
      backgroundColor: isActive ? "gray" : "transparent",
    }}
    onClick={() =>
      setColumnFilters((prev) => {
        console.log(prev);

        const statuses = prev.find((filter) => filter.id === "status")
          ?.value as number[];
        if (!statuses) {
          return prev.concat({
            id: "status",
            value: [status.id],
          });
        }

        return prev.map((f) =>
          f.id === "status"
            ? {
                ...f,
                value: isActive
                  ? statuses.filter((s) => s !== status.id)
                  : statuses.concat(status.id),
              }
            : f
        );
      })
    }
  >
    <ColorIcon color={status.color} />
    {status.name}
  </div>
);

interface FilterPopoverProps {
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
}
const FilterPopover = ({
  columnFilters,
  setColumnFilters,
}: FilterPopoverProps) => {
  const filterStatuses =
    (columnFilters.find((f) => f.id === "status")?.value as number[]) || [];

  return (
    <Popover as="div" className={styles.popover}>
      <Popover.Button
        as="button"
        className={styles.popoverButton}
        style={{
          backgroundColor: filterStatuses.length > 0 ? "blue" : "",
        }}
      >
        <FilterIcon className={styles.popoverIcon} />
        Filter
      </Popover.Button>

      <Popover.Panel as="div" className={styles.popoverMenu}>
        <p className={styles.statusMenuTitle}>Filter By:</p>
        <p className={styles.statusMenuTitle}>Status</p>
        <div>
          {STATUSES.map((status) => (
            <StatusItem
              key={status.id}
              status={status}
              isActive={filterStatuses.includes(status.id)}
              setColumnFilters={setColumnFilters}
            />
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
};
export default FilterPopover;
