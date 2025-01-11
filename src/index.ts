
/* IMPORT */

import type {TruncationOptions, WidthOptions as Options} from 'fast-string-truncated-width';
import fastStringTruncatedWidth from 'fast-string-truncated-width';

/* HELPERS */

const NO_TRUNCATION: TruncationOptions = {
  limit: Infinity,
  ellipsis: '',
  ellipsisWidth: 0,
};

/* MAIN */

const fastStringWidth = ( input: string, options: Options = {} ): number => {

  return fastStringTruncatedWidth ( input, NO_TRUNCATION, options ).width;

};

/* EXPORT */

export default fastStringWidth;
export type {Options};
