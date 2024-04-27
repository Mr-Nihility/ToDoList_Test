import { TableOptions, flexRender, useReactTable } from "@tanstack/react-table";
import SortIcon from "../Icons/SortIcon";

interface TaskTableProps<T> {
  tableOptions: TableOptions<T>;
}

function TaskTable<T>({ tableOptions }: TaskTableProps<T>) {
  const table = useReactTable(tableOptions);

  return (
    <div>
      <div
        className="table"
        style={{
          width: table.getTotalSize(),
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <div className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const sortDirection = header.column.getIsSorted();

              return (
                <div
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
                </div>
              );
            })}
          </div>
        ))}
        {table.getRowModel().rows.map((row) => (
          <div className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div
                className="td"
                style={{ width: cell.column.getSize() }}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
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
