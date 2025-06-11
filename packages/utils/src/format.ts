import { format, formatDistance, formatRelative } from 'date-fns';

/**
 * Format utilities for common formatting needs
 */
export const formatters = {
  date: (date: Date | string) => format(new Date(date), 'PPP'),
  dateTime: (date: Date | string) => format(new Date(date), 'PPp'),
  relative: (date: Date | string) => formatRelative(new Date(date), new Date()),
  distance: (date: Date | string) =>
    formatDistance(new Date(date), new Date(), { addSuffix: true }),
};
