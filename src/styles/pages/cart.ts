import { styled } from "..";

export const AsideContainer = styled("aside", {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "auto",
  maxWidth: "30rem",

  backgroundColor: "$gray800",
  padding: "5rem 3rem 3rem",

  display: "flex",
  flexDirection: "column",
  alignItems: "start",

  transform: "translateX(100%)",
  transition: "transform .5s ease-in-out",

  variants: {
    open: {
      true: {
        transform: "translateX(0)",
      },

      false: {
        transform: "translateX(100%)",
      },
    },
  },

  h2: {
    fontSize: "$lg",
    color: "$gray100",
    marginBottom: "2rem",
  },

  "& > button": {
    backgroundColor: "transparent",
    border: 0,
    color: "$gray300",
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",

    cursor: "pointer",

    "&:hover": {
      color: "red",
    },
  },
});

export const ItemsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "1.5rem",
  overflow: "auto",

  div: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",

    div: {
      display: "flex",
      flexDirection: "column",
      gap: ".5rem",
      alignItems: "start",

      p: {
        fontSize: "$md",
        lineHeight: "1.6",

        span: {
          marginLeft: ".5rem",
          color: "$green300",
        },
      },

      button: {
        backgroundColor: "transparent",
        color: "$green300",
        border: 0,
        fontWeight: "bold",
        lineHeight: "1.6",

        cursor: "pointer",

        "&:hover": {
          color: "$green500",
        },
      },
    },
  },
});

export const PriceContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",

  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    small: {
      fontSize: "$sm",
    },

    p: {
      fontSize: "$md",
    },

    h6: {
      fontSize: "$lg",
    },
  },
});

export const FooterContainer = styled("footer", {
  width: "100%",
  maxWidth: "30rem",
  marginTop: "auto",

  display: "flex",
  flexDirection: "column",
  gap: "3.625rem",

  button: {
    backgroundColor: "$green300",
    color: "$white",
    border: 0,
    borderRadius: 8,

    padding: "1.25rem 2rem",

    cursor: "pointer",
    fontSize: "$md",
    fontWeight: "bold",
    lineHeight: "1.6",

    transition: "all 0.3s ease",

    "&:hover": {
      backgroundColor: "$green500",
    },
  },
});

export const CartButtonContainer = styled("button", {
  position: "relative",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ItemCount = styled("span", {
  position: "absolute",
  top: "-5px",
  right: "-5px",
  backgroundColor: "$green300",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
});
