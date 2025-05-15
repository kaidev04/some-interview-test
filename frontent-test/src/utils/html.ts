export const sanitizeHtml = (html: string): string => {
  return html
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}
