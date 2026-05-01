export class DateUtils {
  static readonly formatMonth = (yearMonth: string): string => {
    const [year, month] = yearMonth.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    const monthStr = date.toLocaleString("es-ES", { month: "short" });
    return monthStr.replace(/^\w/, (c) => c.toUpperCase());
  };
}
