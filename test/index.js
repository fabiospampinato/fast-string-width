
/* IMPORT */

import {describe} from 'fava';
import fastStringWidth from '../dist/index.js';

/* MAIN */

describe ( 'Fast String Width', it => {

  it ( 'supports basic cases', t => {

    t.is ( fastStringWidth ( 'hello' ), 5 );
    t.is ( fastStringWidth ( '\x1b[31mhello' ), 5 );

    t.is ( fastStringWidth ( 'abcde' ), 5 );
    t.is ( fastStringWidth ( '古池や' ), 6 );
    t.is ( fastStringWidth ( 'あいうabc' ), 9 );
    t.is ( fastStringWidth ( 'あいう★' ), 7 );
    t.is ( fastStringWidth ( '±' ), 1 );
    t.is ( fastStringWidth ( 'ノード.js' ), 9 );
    t.is ( fastStringWidth ( '你好' ), 4 );
    t.is ( fastStringWidth ( '안녕하세요' ), 10 );
    t.is ( fastStringWidth ( 'A\uD83C\uDE00BC' ), 5 );
    t.is ( fastStringWidth ( '\u001B[31m\u001B[39m' ), 0 );
    // t.is ( fastStringWidth ( '\u001B]8;;https://github.com\u0007Click\u001B]8;;\u0007' ), 5 ); //TODO: Maybe support these extra escapes too?
    t.is ( fastStringWidth ( '\u{231A}' ), 2 );
    t.is ( fastStringWidth ( '\u{2194}\u{FE0F}' ), 2 );
    t.is ( fastStringWidth ( '\u{1F469}' ), 2 );
    t.is ( fastStringWidth ( '\u{1F469}\u{1F3FF}' ), 2 );
    t.is ( fastStringWidth ( '\u{845B}\u{E0100}' ), 2 );
    t.is ( fastStringWidth ( 'ปฏัก' ), 3 );
    t.is ( fastStringWidth ( '_\u0E34' ), 1 );

  });

  it ( 'supports control characters', t => {

    t.is ( fastStringWidth ( String.fromCodePoint ( 0 ) ), 0 );
    t.is ( fastStringWidth ( String.fromCodePoint ( 31 ) ), 0 );
    t.is ( fastStringWidth ( String.fromCodePoint ( 127 ) ), 0 );
    t.is ( fastStringWidth ( String.fromCodePoint ( 134 ) ), 0 );
    t.is ( fastStringWidth ( String.fromCodePoint ( 159 ) ), 0 );
    t.is ( fastStringWidth ( '\u001B' ), 0 );

  });

  it ( 'supports combining characters', t => {

    t.is ( fastStringWidth ( 'x\u0300' ), 1 );

  });

  it ( 'supports ZWJ characters', t => {

    t.is ( fastStringWidth ( '👶' ), 2 );
    t.is ( fastStringWidth ( '👶🏽' ), 2 );
    t.is ( fastStringWidth ( '👩‍👩‍👦‍👦' ), 2 );
    t.is ( fastStringWidth ( '👨‍❤️‍💋‍👨' ), 2 );

    t.is ( fastStringWidth ( '👶'.repeat ( 2 ) ), 4 );
    t.is ( fastStringWidth ( '👶🏽'.repeat ( 2 ) ), 4 );
    t.is ( fastStringWidth ( '👩‍👩‍👦‍👦'.repeat ( 2 ) ), 4 );
    t.is ( fastStringWidth ( '👨‍❤️‍💋‍👨'.repeat ( 2 ) ), 4 );

  });

  it ( 'supports unicode characters', t => {

    t.is ( fastStringWidth ( '…' ), 1 );
    t.is ( fastStringWidth ( '\u2770' ), 1 );
    t.is ( fastStringWidth ( '\u2771' ), 1 );
    // t.is ( fastStringWidth ( '\u21a9' ), 2 );
    t.is ( fastStringWidth ( '\u2193' ), 1 );
    t.is ( fastStringWidth ( '\u21F5' ), 1 );
    t.is ( fastStringWidth ( '\u2937' ), 1 );
    t.is ( fastStringWidth ( '\u27A4' ), 1 );
    t.is ( fastStringWidth ( '\u2190' ), 1 );
    t.is ( fastStringWidth ( '\u21d0' ), 1 );
    // t.is ( fastStringWidth ( '\u2194' ), 2 );
    t.is ( fastStringWidth ( '\u21d4' ), 1 );
    t.is ( fastStringWidth ( '\u21ce' ), 1 );
    t.is ( fastStringWidth ( '\u27f7' ), 1 );
    t.is ( fastStringWidth ( '\u2192' ), 1 );
    t.is ( fastStringWidth ( '\u21d2' ), 1 );
    t.is ( fastStringWidth ( '\u21e8' ), 1 );
    t.is ( fastStringWidth ( '\u2191' ), 1 );
    t.is ( fastStringWidth ( '\u21C5' ), 1 );
    // t.is ( fastStringWidth ( '\u2197' ), 2 );
    t.is ( fastStringWidth ( '\u21cb' ), 1 );
    t.is ( fastStringWidth ( '\u21cc' ), 1 );
    t.is ( fastStringWidth ( '\u21c6' ), 1 );
    t.is ( fastStringWidth ( '\u21c4' ), 1 );
    t.is ( fastStringWidth ( '\u2217' ), 1 );
    // t.is ( fastStringWidth ( '✔' ), 2 );
    t.is ( fastStringWidth ( '\u2014' ), 1 );
    t.is ( fastStringWidth ( '\u2022' ), 1 );
    t.is ( fastStringWidth ( '\u2026' ), 1 );
    t.is ( fastStringWidth ( '\u2013' ), 1 );
    // t.is ( fastStringWidth ( '\u2709' ), 2 );
    t.is ( fastStringWidth ( '\u2261' ), 1 );
    t.is ( fastStringWidth ( '\u2691' ), 1 );
    t.is ( fastStringWidth ( '\u2690' ), 1 );
    t.is ( fastStringWidth ( '\u22EF' ), 1 );
    t.is ( fastStringWidth ( '\u226A' ), 1 );
    t.is ( fastStringWidth ( '\u226B' ), 1 );
    t.is ( fastStringWidth ( '\u270E' ), 1 );
    t.is ( fastStringWidth ( '\u00a0' ), 1 );
    t.is ( fastStringWidth ( '\u2009' ), 1 );
    t.is ( fastStringWidth ( '\u200A' ), 1 );
    t.is ( fastStringWidth ( '\u274F' ), 1 );
    t.is ( fastStringWidth ( '\u2750' ), 1 );
    // t.is ( fastStringWidth ( '\u26a0' ), 2 );
    t.is ( fastStringWidth ( '\u200b' ), 1 );

  });

});
