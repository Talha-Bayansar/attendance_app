/* eslint-disable @typescript-eslint/no-var-requires */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

/** @type {import("next").NextConfig} */
const config = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["tr", "nl"],
    defaultLocale: "tr",
  },
});

module.exports = config;
