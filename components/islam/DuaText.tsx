// The book wraps the supplication itself in (( )) and writes its own instructions outside them.
// Texts without markers (morning / evening adhkar) are shown as a single supplication.
export default function DuaText({ text }: { text: string }) {
  // A few entries in the source have unbalanced / nested (( )): show them as one block, markers removed, words untouched.
  const opens = (text.match(/\(\(/g) ?? []).length;
  const closes = (text.match(/\)\)/g) ?? []).length;
  const nested = /\(\((?:(?!\)\))[\s\S])*\(\(/.test(text);
  if (opens !== closes || nested) {
    return (
      <p className="font-quranic text-2xl md:text-[1.75rem] my-1 whitespace-pre-line" style={{ color: 'var(--qt-ink)' }}>
        {text.replace(/\(\(|\)\)/g, '').trim()}
      </p>
    );
  }
  const parts = text.split(/(\(\([\s\S]*?\)\))/g).filter((x) => x.trim() && !/^[.،,؛\s]+$/.test(x));
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('((') || parts.length === 1 ? (
          <p key={i} className="font-quranic text-2xl md:text-[1.75rem] my-1 whitespace-pre-line" style={{ color: 'var(--qt-ink)' }}>
            {part.startsWith('((') ? part.slice(2, -2).trim() : part.trim()}
          </p>
        ) : (
          <p key={i} className="font-quranic text-lg md:text-xl my-1 whitespace-pre-line" style={{ color: 'var(--qt-muted)' }}>
            {part.trim()}
          </p>
        )
      )}
    </>
  );
}

