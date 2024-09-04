import { FormattedDate, formatNumber, roundToNearest, formatOrdinal } from '@/helpers';

describe('FormattedDate', () => {
  const timestamp = new Date('2021-12-25T15:45:30Z').getTime();

  test('preview - returns formatted date string', () => {
    const formattedDate = new FormattedDate(timestamp);
    expect(formattedDate.preview).toBe('Dec 25, 15:45:30');
  });

  test('full - returns full date without timezone info', () => {
    const formattedDate = new FormattedDate(timestamp);
    expect(formattedDate.full).toBe('Sat Dec 25 2021 15:45:30 GMT+0000');
  });

  test('UTCHoursMinutesSeconds - returns formatted UTC time', () => {
    const formattedDate = new FormattedDate(timestamp);
    expect(formattedDate.UTCHoursMinutesSeconds).toBe('15h:45m:30s Dec 25 UTC');
  });
});

describe('formatNumber', () => {
  test('returns the same number as string when under 1000', () => {
    expect(formatNumber(999)).toBe('999');
  });

  test('formats thousands with a suffix', () => {
    expect(formatNumber(1000)).toBe('1K');
    expect(formatNumber(1500)).toBe('1.5K');
  });

  test('formats numbers exactly divisible by 1000 correctly', () => {
    expect(formatNumber(2000)).toBe('2K');
  });
});


describe('roundToNearest', () => {
  test('rounds number to nearest specified unit', () => {
    expect(roundToNearest(1234, 100)).toBe(1300);
    expect(roundToNearest(1250, 50)).toBe(1250);
  });
});

describe('formatOrdinal', () => {
  test('returns ordinal representation of numbers', () => {
    expect(formatOrdinal(1)).toBe('1st');
    expect(formatOrdinal(2)).toBe('2nd');
    expect(formatOrdinal(3)).toBe('3rd');
    expect(formatOrdinal(4)).toBe('4th');
    expect(formatOrdinal(11)).toBe('11th');
    expect(formatOrdinal(21)).toBe('21st');
    expect(formatOrdinal(22)).toBe('22nd');
    expect(formatOrdinal(23)).toBe('23rd');
    expect(formatOrdinal(24)).toBe('24th');
  });
});
