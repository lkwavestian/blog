import tailwindConfig from "@fe-qianxun/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig],
  content: ["./docs/**/*.{js,ts,md,vue}"],
};
