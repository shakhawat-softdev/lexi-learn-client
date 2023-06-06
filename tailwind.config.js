/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  themes: [
    {
      mytheme: {

        "primary": "#17a6ed",

        "secondary": "#c3e88d",

        "accent": "#1950b7",

        "neutral": "#312334",

        "base-100": "#f9fafb",

        "info": "#6180d6",

        "success": "#24ccb3",

        "warning": "#f5b214",

        "error": "#f72b58",
      },
    },
  ],
  plugins: [require("daisyui")],
}

