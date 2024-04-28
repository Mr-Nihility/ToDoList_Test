import moment from "moment";

export function isInCurrentWeek(date: string | null): boolean {
  if (!date) return false;
  const target = new Date(date);
  const today = moment().clone();
  const startOfWeek = today.startOf("week").clone();
  const endOfWeek = today.endOf("week").clone();
  console.log(startOfWeek);

  return moment(target).isBetween(startOfWeek, endOfWeek, null, "[]");
}
