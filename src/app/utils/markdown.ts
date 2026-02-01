import { marked } from 'marked';
import DOMPurify from 'dompurify';

export async function markdownToHtml(markdown: string): Promise<string> {
  const html = await marked.parse(markdown);
  return DOMPurify.sanitize(html);
}
