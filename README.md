# TgStorage

Advanced "Saved Messages" of the Telegram.

This application is designed for more convenient storage of data in the Telegram.

## MTProto
Based on https://github.com/spalt08/mtproto-js
- Updated layer (133)
- Fixed server time offset
- Fixed writer buffer size

## Bugs and Suggestions
Please contact <a href="https://t.me/tgstorage_support">TgStorage Support</a>

## Development

### Environment variables
Environment variables are in the file `.env.example`.

You should create files `.env.dev` and `.env.prod` locally.

### Localization
Locale files:
- `src/features/intro/intro.texts.${locale}.json`
- `src/features/auth/auth.texts.${locale}.json`
- `src/features/storage/storage.texts.${locale}.json`
- `src/widgets/widgets.texts.${locale}.json`
- `src/ui/elements/select/select.texts.${locale}.json`
- `src/ui/elements/ios-install-prompt/ios-install-prompt.texts.${locale}.json`

You should fix these files for a new locale:
- `src/tools/detect-locale.ts`
- `src/ui/elements/select/select.tsx`
- `src/ui/elements/ios-install-prompt/ios-install-prompt.tsx`
