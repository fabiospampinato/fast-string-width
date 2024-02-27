
/* IMPORT */

import type {WidthOptions as Options} from 'fast-string-truncated-width';
import fastStringTruncatedWidth from 'fast-string-truncated-width';

/* HELPERS */

const NO_TRUNCATION = { limit: Infinity, ellipsis: '' };

/* MAIN */

const fastStringWidth = ( input: string, options: Options = {} ): number => {

  return fastStringTruncatedWidth ( input, NO_TRUNCATION, options ).width;

};

/* EXPORT */

export default fastStringWidth;
export type {Options};
