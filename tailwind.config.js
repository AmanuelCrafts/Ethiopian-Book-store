// tailwind.config.js
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["cupcake"],
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
