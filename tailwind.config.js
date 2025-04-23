/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EDAE15',
        secondary: {
          100: '#1E1F25',
          900: '#151515',
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
});
