import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { STATUS_PENDING } from "../../redux/todo/todoInitialState";
import { addTodo } from "../../redux/todo/todoSlice";
import { RouterPath } from "../../types/router.types";
import { CardStatus, Todo } from "../../types/todo.types";
import { TodoSchema } from "../../types/todoSchema";
import { DateCustomInput } from "../DateCell/DateCell";
import styles from "./CreateTodoFrom.module.scss";
export function CreateTodoFrom() {
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Todo>({
    defaultValues: {
      text: "",
      due: null,
      notes: "",
    },
    resolver: zodResolver(TodoSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Todo> = (data: Todo) => {
    const { text, due, notes } = data;
    const newTodo: Todo = {
      text,
      due,
      notes,
      id: Date.now() + "",
      createAt: new Date().toDateString(),
      updateAt: null,
      deleteAt: null,
      cardStatus: CardStatus.Active,
      status: STATUS_PENDING,
    };

    dispatch(addTodo(newTodo));

    navigator(`/${RouterPath.TodoList}`);
  };

  return (
    <div className={styles.contentBox}>
      <h1 className={styles.title}>Create task</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, (data) => {
          console.error(data);
        })}
      >
        <label className={styles.label}>
          Enter todo name
          <input type="text" {...register("text")} className={styles.input} />
          {errors.text && (
            <span style={{ color: "red" }}>{errors.text.message}</span>
          )}
        </label>
        <label className={styles.label}>
          Enter todo description
          <input type="text" {...register("notes")} className={styles.input} />
        </label>
        <Controller
          name="due"
          control={control}
          render={({ field }) => {
            return (
              <>
                <label className={styles.label}>
                  Enter due date
                  <DatePicker
                    onCalendarOpen={() => isDatePickerOpened}
                    wrapperClassName="date-wrapper"
                    calendarClassName={"calendar"}
                    dateFormat="MMM d"
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date?.toDateString())}
                    customInput={
                      <DateCustomInput
                        value={field.value ? new Date(field.value) : null}
                        onClick={() => setIsDatePickerOpened(true)}
                        clearDate={() => {
                          setValue("due", null);
                        }}
                      />
                    }
                  />
                </label>
                {/* {errors.due && (
              <p className={styles.error}>{errors.phone.message}</p>
            )} */}
              </>
            );
          }}
        />

        <button className={styles.btn} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
