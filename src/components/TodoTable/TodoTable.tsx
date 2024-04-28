import { TableOptions, flexRender, useReactTable } from "@tanstack/react-table";
import SortIcon from "../Icons/SortIcon";

interface TaskTableProps<T> {
  tableOptions: TableOptions<T>;
}

function TaskTable<T>({ tableOptions }: TaskTableProps<T>) {
  const table = useReactTable(tableOptions);

  return (
    <div className="tableBox">
      <table
        className="table"
        style={{
          width: table.getTotalSize(),
          // width: "100%",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="tr" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortDirection = header.column.getIsSorted();

                return (
                  <th
                    className="th"
                    style={{
                      width: header.getSize(),
                    }}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() && (
                      <SortIcon
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    )}
                    {
                      {
                        asc: " 🔼",
                        desc: " 🔽",
                        false: "",
                      }[sortDirection ? sortDirection : "false"]
                    }
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                    />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="tr" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="td"
                  style={{ width: cell.column.getSize() }}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {table.getPageCount() > 1 && (
        <>
          <p>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
          <div>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default TaskTable;
