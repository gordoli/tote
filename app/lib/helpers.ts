import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  subDays,
} from "date-fns";

/**
 * Formats a date according to given relative time spans.
 * - If within the last minute, returns "just now".
 * - If within the last hour, shows "Xm ago".
 * - If within the last day, shows "Xh ago".
 * - If within the last week but over a day, shows "Xd ago".
 * - Otherwise, shows the date in the format "MMM d".
 *
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatRelativeDate = (date: Date) => {
  const now = new Date();

  const diffInMinutes = differenceInMinutes(now, date);
  const diffInHours = differenceInHours(now, date);
  const diffInDays = differenceInDays(now, date);

  if (diffInMinutes < 1) {
    return "Just now"; // Within the last minute
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`; // Within the last hour
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`; // Within the last day
  } else if (diffInDays <= 7) {
    return `${diffInDays}d ago`; // Within the last week but over a day
  } else {
    return format(date, "MMM d"); // Older than a week, formatted by month and day
  }
};

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const EmailValidation = (value: string) => {
  if (!value.trim()) {
    return "Email is required";
  } else if (!regexEmail.test(value.trim())) {
    return "Email format is wrong";
  }
  return "";
};

export default formatRelativeDate;
