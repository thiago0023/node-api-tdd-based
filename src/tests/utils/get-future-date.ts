import { parseISO, setYear } from "date-fns";

export function getFutureDate(date: string, years: number): Date {
    return setYear(parseISO(date), new Date().getFullYear() + years);
}