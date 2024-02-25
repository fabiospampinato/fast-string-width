
/* IMPORT */

import benchmark from 'benchloop';
// import stringWidth from 'string-width';
import fastStringWidth from '../dist/index.js';

/* HELPERS */

const IMPLEMENTATIONS = [
  // [Bun.stringWidth, 'bun'],
  // [stringWidth, 'string-width'],
  [fastStringWidth, 'fast-string-width']
];

const INPUTS = [
  ['helloworld', 'ascii'],
  ['\x1b[31mhelloworld', 'ascii+ansi'],
  ['helloworld😀', 'ascii+emoji'],
  ['\x1b[31m😀', 'ansi+emoji'],
  ['helloworld😀\x1b[31m😀', 'ascii+ansi+emoji'],
  // ['古池や', 'cjk']
];

const REPETITIONS = [1, 10, 50, 100, 500, 1_000, 5_000, 25_000];

/* MAIN */

benchmark.config ({
  iterations: 10
});

for ( const [implementation, implementationName] of IMPLEMENTATIONS ) {

  benchmark.group ( implementationName, () => {

    for ( const [input, inputName] of INPUTS ) {

      for ( const repetitions of REPETITIONS ) {

        const string = input.repeat ( repetitions );

        benchmark ({
          name: `${inputName}-${repetitions}`,
          fn: () => {
            implementation ( string );
          }
        });

      }

    }

  });

}

benchmark.summary ();
