/**
 * DateTime Utility Functions
 * Enes Öztürk DateTime Architecture
 */

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDayOfYear(date: Date = new Date()): number {
  const startOfYear = Date.UTC(date.getFullYear(), 0, 1);
  const calendarDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((calendarDate - startOfYear) / 86400000) + 1;
}

export function getWeekOfYear(date: Date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function formatTurkishDateTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(date);
}

export function parseLocalDateInput(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatLocalDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateDateDifference(dateA: Date, dateB: Date) {
  const start = new Date(Math.min(dateA.getTime(), dateB.getTime()));
  const end = new Date(Math.max(dateA.getTime(), dateB.getTime()));

  const diffMs = end.getTime() - start.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Calculate business days (Monday-Friday)
  let businessDays = 0;
  const current = new Date(start);
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      businessDays++;
    }
    current.setDate(current.getDate() + 1);
  }

  // Calculate approximate year/month/day breakdown
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonthEnd = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonthEnd.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    diffMs,
    totalSeconds,
    totalMinutes,
    totalHours,
    totalDays,
    weeks,
    remainingDays,
    businessDays,
    breakdown: {
      years,
      months,
      days,
    },
    isSameDay: start.toDateString() === end.toDateString(),
  };
}

export function addDurationToDate(
  baseDate: Date,
  amount: number,
  unit: 'days' | 'businessDays' | 'weeks' | 'months' | 'years'
): Date {
  const result = new Date(baseDate.getTime());

  if (unit === 'days') {
    result.setDate(result.getDate() + amount);
  } else if (unit === 'businessDays') {
    let added = 0;
    const direction = amount >= 0 ? 1 : -1;
    const target = Math.abs(amount);
    while (added < target) {
      result.setDate(result.getDate() + direction);
      const day = result.getDay();
      if (day !== 0 && day !== 6) {
        added++;
      }
    }
  } else if (unit === 'weeks') {
    result.setDate(result.getDate() + amount * 7);
  } else if (unit === 'months') {
    const originalDay = result.getDate();
    const targetMonth = result.getMonth() + amount;
    result.setDate(1);
    result.setMonth(targetMonth);
    const lastTargetDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
    result.setDate(Math.min(originalDay, lastTargetDay));
  } else if (unit === 'years') {
    const originalMonth = result.getMonth();
    const originalDay = result.getDate();
    result.setDate(1);
    result.setFullYear(result.getFullYear() + amount);
    result.setMonth(originalMonth);
    const lastTargetDay = new Date(result.getFullYear(), originalMonth + 1, 0).getDate();
    result.setDate(Math.min(originalDay, lastTargetDay));
  }

  return result;
}

export function getRelativeTimeString(date: Date, locale: string = 'tr'): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const now = new Date();
  const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000);

  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  const units: Intl.RelativeTimeFormatUnit[] = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(diffInSeconds));
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
  const value = Math.round(diffInSeconds / divisor);

  return rtf.format(value, units[unitIndex]);
}

export function getLastDayOfMonth(year: number, month: number): Date {
  // Month is 1-indexed here for convenience (1 = Jan, 12 = Dec)
  // Trick: passing 0 for the day gives the last day of the previous month
  return new Date(year, month, 0);
}

export function getWeekRange(date: Date = new Date()): { start: Date; end: Date } {
  const current = new Date(date);
  const day = current.getDay();
  // In Turkey/ISO, Monday is day 1, Sunday is day 7
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(current);
  monday.setDate(current.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { start: monday, end: sunday };
}
