import DOMPurify from 'dompurify';
import removedMd from 'remove-markdown';

import { marked } from 'marked';

export function markdownToHtml(markdown: string): string {
  const html = marked.parse(markdown, { async: false });
  return DOMPurify.sanitize(html);
}

export function markdownToText(markdown: string): string {
  return removedMd(markdown).trim();
}
