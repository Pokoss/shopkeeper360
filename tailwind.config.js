import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                oswald: ["Oswald", "sans-serif"],
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                secondary: "#2196F3",
                primary: "#4CAF50",
              },
        },
    },

    plugins: [
        forms,
        require('@tailwindcss/line-clamp'),
        require('tailwind-scrollbar'),
    ],

});