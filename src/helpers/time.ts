export function getPrettyDate(timestamp: number) {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${month} ${day}, ${hours}:${minutes}:${seconds}`;
}

export function getFullDate(timestamp: number) {
  const dateString = new Date(timestamp).toString();

  return dateString.replace(/ \([^)]*\)/, '');
}