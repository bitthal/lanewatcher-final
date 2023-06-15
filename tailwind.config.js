module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datetimepicker/dist/react-tailwindcss-datetimepicker.js'
    
  ],
  
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        display: ["Playfair Display", "serif"],

      },
      colors: {
     
        primary: "#ca261a",
        primary2: "#ad1f15",

   
       
       
      },
      spacing: {
        7: "1.75rem",
        9: "2.25rem",
        28: "7rem",
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
      boxShadow: {
        "3xl": "0px 8px 25px rgba(0, 0, 0, 0.07)",
        "4xl": "0px 8px 25px rgba(0, 0, 0, 0.04);",
        "5xl": "0px 8px 25px rgba(0, 0, 0, 0.12)",
        "6xl": "0px 8px 25px rgba(0, 0, 0, 0.20)",
        custom1:"0px 4px 16px 10px rgba(0, 0, 0, 0.1)",
        custom2:"8px 2px 5px -3px rgba(0,0,0,0.15)",
        custom3:"-1px 0px 5px 2px rgba(0,0,0,0.05)",
        outline: "0 0 0 3px rgba(101, 31, 255, 0.4)",
      },
    },
  },
  variants: {
    scale: ["responsive", "hover", "focus", "group-hover"],
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
