import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  "::-webkit-scrollbar": {
    width: "6px",
  },

  "::-webkit-scrollbar-track": {
    background: "#000",
  },

  "::-webkit-scrollbar-thumb": {
    background: "#555",
    borderRadius: "3px",
  },

  "::-webkit-scrollbar-thumb:hover": {
    background: "#777",
  },
});
