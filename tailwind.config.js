// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseconfig = require('@aleph-front/core/dist/tailwind.config.js')

module.exports = {
  ...baseconfig,
  content: [
    ...baseconfig.content,
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...baseconfig.theme,
    extend: {
      ...baseconfig.theme.extend,
    },
  },
  plugins: [
    ...baseconfig.plugins,
  ],
}

