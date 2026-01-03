
export const htmlToMarkdown = (html: string): string => {
  return html
    .replace(/<h([1-6])>/g, (match, level) => '#'.repeat(parseInt(level)) + ' ')
    .replace(/<\/h[1-6]>/g, '\n\n')
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<strong>/g, '**')
    .replace(/<\/strong>/g, '**')
    .replace(/<em>/g, '*')
    .replace(/<\/em>/g, '*')
    .replace(/<blockquote>/g, '> ')
    .replace(/<\/blockquote>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]*>/g, '');
};
