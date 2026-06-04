// Simple Markdown renderer for oracle responses
// Converts ### headings, **bold**, and paragraphs to HTML

export function renderMarkdown(text: string): string {
  let html = text
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

    // ### Heading
    .replace(/^### (.+)$/gm, '<h3 class="text-[#c9a96e] text-base font-semibold mt-5 mb-2" style="font-family: \'Playfair Display\', serif">$1</h3>')

    // **bold**
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#e8e0d5]/90">$1</strong>')

    // *italic*
    .replace(/\*(.+?)\*/g, '<em class="text-[#e8e0d5]/60">$1</em>')

    // Chinese quotes «»
    .replace(/«(.+?)»/g, '<span class="text-[#c9a96e]/70 italic">$1</span>')

    // Double newlines → paragraph breaks
    .replace(/\n\n/g, '</p><p class="mb-3 leading-relaxed">')

    // Single newlines → <br> within paragraphs
    .replace(/\n/g, '<br/>')

  // Wrap in paragraph
  html = '<p class="mb-3 leading-relaxed">' + html + '</p>'

  // Clean up empty paragraphs
  html = html.replace(/<p class="mb-3 leading-relaxed"><\/p>/g, '')
  html = html.replace(/<p class="mb-3 leading-relaxed"><br\/><\/p>/g, '')

  return html
}
