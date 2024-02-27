# Fast String Width

A fast function for calculating the visual width of a string once printed to the terminal.

## Install

```sh
npm install --save fast-string-width
```

## Usage

```ts
import fastStringWidth from 'fast-string-width';

// Calculating the visual width of some strings

fastStringWidth ( 'hello' ); // => 5
fastStringWidth ( '\x1b[31mhello' ); // => 5
fastStringWidth ( '👨‍👩‍👧‍👦' ); // => 2
fastStringWidth ( 'hello👨‍👩‍👧‍👦' ); // => 7

// Calculating the visual width while tweaking the width of emojis

fastStringWidth ( '👶👶🏽', { emojiWidth: 1.5 } ); // => 3
```

## License

MIT © Fabio Spampinato
