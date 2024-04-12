type ParagraphHTMLTag =
  | 'p'
  | 'span'
  | 'b'
  | 'strong'
  | 'em'
  | 'mark'
  | 'small'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup';

type HeadingHTMLTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type BoxHTMLTag = 'article' | 'aside' | 'div' | 'footer' | 'header' | 'main' | 'span' | 'section' | 'nav';

export type {ParagraphHTMLTag, HeadingHTMLTag, BoxHTMLTag}
