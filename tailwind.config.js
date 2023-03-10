const plugin = require('tailwindcss/plugin');

// a small plugin that capitalizes the first letter of a sentence (not every word)
// source https://github.com/tailwindlabs/tailwindcss/discussions/1745#discussioncomment-145597
const capitalizeFirst = plugin(({ addUtilities }) => {
    const newUtilities = {
        '.capitalize-first:first-letter': {
            textTransform: 'uppercase',
        },
    };
    addUtilities(newUtilities, ['responsive']);
});

module.exports = {
    purge: [
        './assets/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [capitalizeFirst],
};
