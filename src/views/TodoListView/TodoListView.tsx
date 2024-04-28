import {
  ColumnFilter,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import ActionsCell from "../../components/ActionsCell/ActionsCell";
import DateCell from "../../components/DateCell/DateCell";
import EditableCell from "../../components/EditableCell/EditableCell";
import Filters from "../../components/Filter/Filter";
import StatusCell from "../../components/StatusCell/StatusCell";
import TodoTable from "../../components/TodoTable/TodoTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { patchTodo } from "../../redux/todo/todoSlice";
import { CardStatus, Todo, TodoStatus } from "../../types/todo.types";

const columnHelper = createColumnHelper<Todo>();
const columns = [
  columnHelper.accessor("text", {
    header: "Task",
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
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
  }),
  columnHelper.accessor("cardStatus", {
    header: "Card",
    cell: (props) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#32c732",
          height: "100%",
        }}
      >
        {props.getValue().toUpperCase()}
      </div>
    ),
  }),
  columnHelper.accessor("createAt", {
    header: "createAt",
    cell: (props) => <div>{props.getValue()}</div>,
  }),
  columnHelper.accessor("updateAt", {
    header: "updateAt",
    cell: (props) => <div>{props.getValue()}</div>,
  }),
  columnHelper.display({
    header: "Actions",
    cell: ActionsCell,
  }),
];

function TodoListView() {
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const todoList = useAppSelector((state) =>
    state.todoState.todoList.filter(
      (todo) => todo.cardStatus === CardStatus.Active
    )
  );
  const dispatch = useAppDispatch();

  return (
    <>
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
        <h3>{" Ooops! You have no task yet :("}</h3>
      )}
    </>
  );
}

export default TodoListView;
