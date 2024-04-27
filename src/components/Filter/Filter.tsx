import { ColumnFilter } from "@tanstack/react-table";
import FilterPopover from "../FilterPopover/FilterPoper";
import SearchIcon from "../Icons/SearchIcon";
import styles from "./Filter.module.scss";

interface FilterProps {
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
}
const Filters = ({ columnFilters, setColumnFilters }: FilterProps) => {
  const text = columnFilters.find((f) => f.id === "text")?.value || "";

  const onFilterChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <div className={styles.filterBox}>
      <label className={styles.filterLabel}>
        <SearchIcon width={18} className={styles.filterIcon} />
        <input
          type="text"
          placeholder="Task name"
          className={styles.filterInput}
          value={text as string}
          onChange={(e) => onFilterChange("text", e.target.value)}
        />
      </label>
      <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
};
export default Filters;
