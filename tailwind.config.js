module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datetimepicker/dist/react-tailwindcss-datetimepicker.js",
    "./public/fonts/OpenSans-Medium.ttf"
  ],

  theme: {
    extend: {
      screens: {
        'xl': '1910px',
      },
      fontFamily: {
        sans: ["OpenSansExtraBold", "sans-serif"],
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        xxl:['32px', '45px']
      },
      colors: {
        primary: "#A30000",
        primary2: "#ad1f15",
      },
      spacing: {
        7: "1.75rem",
        9: "2.25rem",
        28: "7rem",
        30: "14rem",
        80: "20rem",
        96: "24rem",
        128: "32rem",
        136: "36rem",
        140: "40rem",
      },

      height: {
        "1/2": "50%",
        98: "34rem",
        94: "28rem",
        vh80: "80vh",
        vh70: "70vh",
        vh60: "60vh",
        vh50: "50vh",
        vh40: "40vh",
        vh30: "30vh",
        vh20: "20vh",
      },
      width: {
        25:'25%',
        90: "22.5rem",
        98: "28rem",
        99: "30rem",
      },
      maxWidth: {
        "8xl": "85rem",
      },
      maxHeight: {
        98: "34rem",
      },
      scale: {
        30: ".3",
      },
      zIndex: {
        100: "100",
      },
      margin: {
        32: "6rem",
        35: "7rem",
      },
      boxShadow: {
        "3xl": "0px 8px 25px rgba(0, 0, 0, 0.07)",
        "4xl": "0px 8px 25px rgba(0, 0, 0, 0.04);",
        "5xl": "0px 8px 25px rgba(0, 0, 0, 0.12)",
        "6xl": "0px 8px 25px rgba(0, 0, 0, 0.20)",
        outline: "0 0 0 3px rgba(101, 31, 255, 0.4)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.flex-col-xl': {
          display: 'flex',
          flexDirection: 'row',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  variants: {
    scale: ["responsive", "hover", "focus", "group-hover"],
    textDecoration: ["responsive", "hover", "focus", "focus-visible"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
    opacity: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
    display: ["responsive", "group-hover", "group-focus"],
    extend: {
      margin: ["last"],
      backgroundColor: ["odd"],
    },
  },
};
