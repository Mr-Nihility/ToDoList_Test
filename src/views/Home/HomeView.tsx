import {
  ColumnFilter,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import DateCell from "../../components/DateCell/DateCell";
import EditableCell from "../../components/EditableCell/EditableCell";
import Filters from "../../components/Filter/Filter";
import StatusCell from "../../components/StatusCell/StatusCell";
import TodoTable from "../../components/TodoTable/TodoTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { patchTodo } from "../../redux/todo/todoSlice";
import { CardStatus, Todo, TodoStatus } from "../../types/todo.types";
import { isInCurrentWeek } from "../../utils/date.helpers";
import styles from "./HomeView.module.scss";

const columnHelper = createColumnHelper<Todo>();
const columns = [
  columnHelper.accessor("text", {
    header: "Task",
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
    minSize: 300,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: StatusCell,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses: number[]) => {
      if (filterStatuses.length === 0) return true;
      const status: TodoStatus = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  }),
  columnHelper.accessor("due", {
    header: "Due",
    cell: DateCell,
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
    cell: EditableCell,
    minSize: 300,
  }),
];

function HomeView() {
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const todoList = useAppSelector((state) =>
    state.todoState.todoList.filter((todo) => {
      return todo.cardStatus === CardStatus.Active && isInCurrentWeek(todo.due);
    })
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <h1 className={styles.title}>Tasks on this week! </h1>
      {todoList.length ? (
        <>
          <Filters
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          <TodoTable
            tableOptions={{
              data: todoList,
              columns,
              state: {
                columnFilters,
              },
              getCoreRowModel: getCoreRowModel(),
              getFilteredRowModel: getFilteredRowModel(),
              getPaginationRowModel: getPaginationRowModel(),
              getSortedRowModel: getSortedRowModel(),
              columnResizeMode: "onChange",
              meta: {
                updateData: (todo: Todo) => {
                  console.log(todo);
                  dispatch(patchTodo(todo));
                },
              },
            }}
          />
        </>
      ) : (
        <h3 className={styles.message}>
          {" Ooops! You have no task on this week :("}
        </h3>
      )}
    </>
  );
}

export default HomeView;
