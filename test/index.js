
/* IMPORT */

import {describe} from 'fava';
import fastStringWidth from '../dist/index.js';

/* MAIN */

describe ( 'Fast String Width', it => {

  it ( 'supports in basic cases', t => {

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

  it ( 'ignores control characters', t => {

    t.is ( fastStringWidth ( String.fromCodePoint ( 0 ) ), 0 );
    t.is ( fastStringWidth ( String.fromCodePoint ( 31 ) ), 0 );
    t.is ( fastStringWidth ( String.fromCodePoint ( 127 ) ), 0 );
    t.is ( fastStringWidth ( String.fromCodePoint ( 134 ) ), 0 );
    t.is ( fastStringWidth ( String.fromCodePoint ( 159 ) ), 0 );
    t.is ( fastStringWidth ( '\u001B' ), 0 );

  });

  it ( 'handles combining characters', t => {

    t.is ( fastStringWidth ( 'x\u0300' ), 1 );

  });

  it ( 'handles ZWJ characters', t => {

    t.is ( fastStringWidth ( '👶' ), 2 );
    t.is ( fastStringWidth ( '👶🏽' ), 2 );
    t.is ( fastStringWidth ( '👩‍👩‍👦‍👦' ), 2 );
    t.is ( fastStringWidth ( '👨‍❤️‍💋‍👨' ), 2 );

    t.is ( fastStringWidth ( '👶'.repeat ( 2 ) ), 4 );
    t.is ( fastStringWidth ( '👶🏽'.repeat ( 2 ) ), 4 );
    t.is ( fastStringWidth ( '👩‍👩‍👦‍👦'.repeat ( 2 ) ), 4 );
    t.is ( fastStringWidth ( '👨‍❤️‍💋‍👨'.repeat ( 2 ) ), 4 );

  });

});
