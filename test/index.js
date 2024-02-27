
/* IMPORT */

import {describe} from 'fava';
import fastStringWidth from '../dist/index.js';

/* MAIN */

describe ( 'Fast String Width', it => {

  it ( 'works', t => {

    t.is ( fastStringWidth ( 'hello' ), 5 );
    t.is ( fastStringWidth ( '\x1b[31mhello' ), 5 );
    t.is ( fastStringWidth ( '👨‍👩‍👧‍👦' ), 2 );
    t.is ( fastStringWidth ( 'hello👨‍👩‍👧‍👦' ), 7 );
    t.is ( fastStringWidth ( '👶👶🏽', { emojiWidth: 1.5 } ), 3 );

  });

});
