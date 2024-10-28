/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      // https://stackoverflow.com/a/71795600/14701509
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
