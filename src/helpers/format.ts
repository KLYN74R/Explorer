import numeral from 'numeral';

export class FormattedDate {
  private date ;

  constructor(timestamp: number) {
    this.date = new Date(timestamp);
  }

  get preview() {
    const day = this.date.getDate().toString().padStart(2, '0');
    const month = this.date.toLocaleString('en-GB', { month: 'short' });
    const hours = this.date.getHours().toString().padStart(2, '0');
    const minutes = this.date.getMinutes().toString().padStart(2, '0');
    const seconds = this.date.getSeconds().toString().padStart(2, '0');

    return `${month} ${day}, ${hours}:${minutes}:${seconds}`;
  }

  get full() {
    return String(this.date)
      .replace(/ \([^)]*\)/, '');
  }

  get UTCHoursMinutesSeconds() {
    const hours = this.date.getUTCHours();
    const minutes = this.date.getUTCMinutes();
    const seconds = this.date.getUTCSeconds();

    const formattedHours = `${hours}h`;
    const formattedMinutes = minutes < 10 ? `0${minutes}m` : `${minutes}m`;
    const formattedSeconds = seconds < 10 ? `0${seconds}s` : `${seconds}s`;

    const day = this.date.getDate().toString().padStart(2, '0');
    const month = this.date.toLocaleString('en-GB', { month: 'short' });

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${month} ${day} UTC`;
  }
}

export function formatNumber(num: string | number, precision = 1000) {
  const val = Number(num);

  if (val >= 0 && val <= precision) {
    return num.toString();
  } else {
    if (val % 1000 === 0) {
      return numeral(num).format('0a').toUpperCase();
    } else {
      return numeral(num).format('0.0a').toUpperCase();
    }
  }
}

export function roundToNearest(num: number, unit: number) {
  return Math.ceil(num / unit) * unit;
}

export function formatOrdinal(number: number): string {
  const n = number;

  if (n === 0) return '0';

  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;

  if (v >= 11 && v <= 13) {
    return n + s[0];
  }

  return n + (s[(n % 10)] || s[0]);
}

export function truncateMiddle(str: string) {
  if (str.length <= 20) {
    return str;
  }
  let start = str.substring(0, 10);
  let end = str.substring(str.length - 10);
  return start + '...' + end;
}
