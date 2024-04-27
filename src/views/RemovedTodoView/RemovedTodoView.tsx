import {
  CellContext,
  ColumnFilter,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdRestore } from "react-icons/md";
import Filters from "../../components/Filter/Filter";
import TodoTable from "../../components/TodoTable/TodoTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteTodo, patchTodo } from "../../redux/todo/todoSlice";
import { CardStatus, Todo, TodoStatus } from "../../types/todo.types";

export const Actions = ({ row, table }: CellContext<Todo, unknown>) => {
  const { updateData } = table.options.meta as {
    updateData: (todo: Todo) => void;
  };
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <MdRestore
        onClick={() => {
          updateData({
            ...table.options.data[row.index],
            cardStatus: CardStatus.Active,
            updateAt: new Date().toDateString(),
          });
        }}
      />
      <AiOutlineDelete
        onClick={() => {
          dispatch(deleteTodo(table.options.data[row.index].id));
        }}
      />
    </div>
  );
};
const columnHelper = createColumnHelper<Todo>();
const columns = [
  columnHelper.accessor("text", {
    header: "Task",
    cell: (props) => <div>{props.getValue()}</div>,
    enableColumnFilter: true,
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (props) => <div>{props.getValue()?.name}</div>,
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
    cell: (props) => <div>{props.getValue()}</div>,
  }),
  columnHelper.accessor("deleteAt", {
    header: "deleteAt",
    cell: (props) => <div>{props.getValue()}</div>,
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
    cell: (props) => <div>{props.getValue()}</div>,
  }),
  columnHelper.accessor("cardStatus", {
    header: "Card",
    cell: (props) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#913f3f",
          height: "100%",
        }}
      >
        {props.getValue().toUpperCase()}
      </div>
    ),
  }),
  columnHelper.display({
    header: "Actions",
    cell: Actions,
  }),
];

function RemovedTodoView() {
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const todoList = useAppSelector((state) =>
    state.todoState.todoList.filter(
      (todo) => todo.cardStatus === CardStatus.Removed
    )
  );
  const dispatch = useAppDispatch();

  return (
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
  );
}
export default RemovedTodoView;
