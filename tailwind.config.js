module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D15D36",
        gray: "#DCDCDC",
        "dark-gray": "#707070",
        "gray-1": "#f5f5f5",
        "gray-2": "#969696",
      },
      backgrounds: {
        "gray-1": "rgba(241, 242, 247, 0.5)",
      },
      borderColor: {
        "gray-1": "rgba(186, 186, 186, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      minWidth: {
        200: "200px",
      },
      maxWidth: {
        "1/2": "50%",
      },
      width: {
        100: "25rem",
        110: "27.5rem",
      },
    },
  },
  plugins: [],
};
