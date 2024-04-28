import { CellContext } from "@tanstack/react-table";
import { ForwardedRef, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Todo } from "../../types/todo.types";
import CalendarIcon from "../Icons/CalendarIcon";
import styles from "./DateCell.module.scss";

type DateCustomInputProps = {
  value: Date | null;
  onClick: () => void;
  clearDate: () => void;
};
export const DateCustomInput = forwardRef(
  (
    { value, onClick, clearDate }: DateCustomInputProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={styles.dateBox}
    >
      {value ? (
        <>
          {value}
          <div
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation();
              clearDate();
            }}
          >
            &times;
          </div>
        </>
      ) : (
        <CalendarIcon width={18} />
      )}
    </div>
  )
);

const DateCell = ({
  getValue,
  row,
  table,
}: CellContext<Todo, string | null>) => {
  const date = getValue();
  const { updateData } = table.options.meta as {
    updateData: (todo: Todo) => void;
  };

  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
  return (
    <DatePicker
      onCalendarOpen={() => isDatePickerOpened}
      wrapperClassName="date-wrapper"
      calendarClassName={"calendar"}
      dateFormat="MMM d"
      selected={date ? new Date(date) : null}
      onChange={(date: Date) =>
        updateData({
          ...table.options.data[row.index],
          due: date.toDateString(),
          updateAt: new Date().toDateString(),
        })
      }
      customInput={
        <DateCustomInput
          value={date ? new Date(date) : null}
          onClick={() => setIsDatePickerOpened(true)}
          clearDate={() => {
            updateData({
              ...table.options.data[row.index],
              due: null,
              updateAt: new Date().toDateString(),
            });
          }}
        />
      }
    />
  );
};
export default DateCell;
