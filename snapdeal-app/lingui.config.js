module.exports = {
  locales: ["en", "hi", "ta", "kn"], // English, Hindi, Tamil, Kannada
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
};
