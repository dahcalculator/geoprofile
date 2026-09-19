const ZW_0 = '\u200B';   // Zero-Width Space
const ZW_1 = '\u200C';   // Zero-Width Non-Joiner
const ZW_SEP = '\u200D'; // Zero-Width Joiner (Delimiter)

export function packToZeroWidth(envelopeText: string): string {
  return envelopeText
    .split('')
    .map((char) => {
      const bin = char.charCodeAt(0).toString(2);
      return bin
        .split('')
        .map((b) => (b === '0' ? ZW_0 : ZW_1))
        .join('');
    })
    .join(ZW_SEP);
}

export function unpackZeroWidth(text: string): string | null {
  const zwRegex = new RegExp(`[${ZW_0}${ZW_1}${ZW_SEP}]+`, 'g');
  const match = text.match(zwRegex);
  if (!match) return null;

  const blocks = match.join('').split(ZW_SEP);
  let decoded = '';
  for (const block of blocks) {
    if (!block) continue;
    const binStr = block.split('').map((c) => (c === ZW_0 ? '0' : '1')).join('');
    decoded += String.fromCharCode(parseInt(binStr, 2));
  }
  return decoded;
}