import { i18n } from "@lingui/core";
import { en, hi, ta, kn } from "make-plural/plurals";

// Add plurals (for Hindi, Tamil, etc.)
i18n.loadLocaleData({
  en: { plurals: en },
  hi: { plurals: hi },
  ta: { plurals: ta },
  kn: { plurals: kn },
});

export async function activate(locale) {
  const { messages } = await import(`./locales/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

export { i18n };
