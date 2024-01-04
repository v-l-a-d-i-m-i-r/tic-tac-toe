export function addDays(date: string | number | Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}

export function getDays(startDate: string | number | Date, days: number): Date[] {
  return [...Array(days).keys()].map((daysToAdd) => {
    const result = new Date(startDate);
    result.setDate(result.getDate() + daysToAdd);

    return result;
  });
}

export function getDifferenceInTime(date1: Date, date2: Date): number {
  return date1.getTime() - date2.getTime();
}

export function getDifferenceInDays(date1: Date, date2: Date): number {
  return Math.floor(getDifferenceInTime(date1, date2) / (1000 * 3600 * 24));
}
