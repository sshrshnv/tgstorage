# TgStorage

Advanced "Saved Messages" of the Telegram.

## Languages
You should add files in the `./src/texts/${lang}/` directory.

## Development
You should create files `.env.dev` or `.env.prod` locally.

## MTProto
Based on https://github.com/spalt08/mtproto-js
- Updated layer (166)
- Fixed server time offset
- Fixed writer buffer size
- BigInteger replaced with native BigInt
- Pako replaced with native DecompressionStream
