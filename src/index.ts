
/* IMPORT */

import {isAmbiguous, isFullWidth, isWide} from './utils';
import type {Options} from './types';

/* HELPERS */

const ANSI_RE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/y;
const CONTROL_RE = /[\x00-\x1F\x7F-\x9F]+/y;
const EMOJI_RE = /(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)(?:\u200d(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F))*/yu;
const LATIN_RE = /[\x20-\x7E\xA0-\xFF]+/y;
const MODIFIER_RE = /\p{M}+/gu;

/* MAIN */

//TODO: Optimize matching non-latin letters

const getStringWidth = ( input: string, options: Options = {} ): number => {

  /* CONSTANTS */

  const ANSI_WIDTH = options.ansiWidth ?? 0;
  const CONTROL_WIDTH = options.controlWidth ?? 0;
  const AMBIGUOUS_WIDTH = options.ambiguousWidth ?? 1;
  const EMOJI_WIDTH = options.emojiWidth ?? 2;
  const FULL_WIDTH_WIDTH = options.fullWidthWidth ?? 2;
  const REGULAR_WIDTH = options.regularWidth ?? 1;
  const WIDE_WIDTH = options.wideWidth ?? 2;

  /* STATE */

  let indexPrev = 0;
  let index = 0;
  let length = input.length;
  let match: RegExpMatchArray | null = null;
  let unmatched = '';
  let width = 0;

  /* PARSE LOOP */

  while ( true ) {

    /* UNMATCHED */

    if ( unmatched || index >= length ) {

      unmatched ||= input.slice ( indexPrev, index );

      for ( const char of unmatched.replaceAll ( MODIFIER_RE, '' ) ) {

        const codePoint = char.codePointAt ( 0 ) || 0;

        if ( isFullWidth ( codePoint ) ) {

          width += FULL_WIDTH_WIDTH;

        } else if ( isWide ( codePoint ) ) {

          width += WIDE_WIDTH;

        } else if ( AMBIGUOUS_WIDTH !== REGULAR_WIDTH && isAmbiguous ( codePoint ) ) {

          width += AMBIGUOUS_WIDTH;

        } else {

          width += REGULAR_WIDTH;

        }

      }

      unmatched = '';

    }

    /* EXITING */

    if ( index >= length ) break;

    /* LATIN */

    LATIN_RE.lastIndex = index;
    match = LATIN_RE.exec ( input );

    if ( match ) {

      width += match[0].length * REGULAR_WIDTH;
      unmatched = input.slice ( indexPrev, index );
      index = indexPrev = LATIN_RE.lastIndex;

      continue;

    }

    /* ANSI */

    ANSI_RE.lastIndex = index;
    match = ANSI_RE.exec ( input );

    if ( match ) {

      width += ANSI_WIDTH;
      unmatched = input.slice ( indexPrev, index );
      index = indexPrev = ANSI_RE.lastIndex;

      continue;

    }

    /* CONTROL */

    CONTROL_RE.lastIndex = index;
    match = CONTROL_RE.exec ( input );

    if ( match ) {

      width += match[0].length * CONTROL_WIDTH;
      unmatched = input.slice ( indexPrev, index );
      index = indexPrev = CONTROL_RE.lastIndex;

      continue;

    }

    /* EMOJI */

    EMOJI_RE.lastIndex = index;
    match = EMOJI_RE.exec ( input );

    if ( match ) {

      width += EMOJI_WIDTH;
      unmatched = input.slice ( indexPrev, index );
      index = indexPrev = EMOJI_RE.lastIndex;

      continue;

    }

    /* UNMATCHED INDEX */

    index += 1;

  }

  /* RETURN */

  return width;

};

/* EXPORT */

export default getStringWidth;
export type {Options};
