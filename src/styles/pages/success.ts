import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },

  a: {
    marginTop: "5rem",
    display: "block",
    textDecoration: "none",
    fontSize: "$lg",
    fontWeight: "bold",
    color: "$green500",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImageListContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "4rem",
});

export const ImageItemContainer = styled("div", {
  width: 130,
  height: 130,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "50%", // Círculo
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',

  "&:not(:first-child)": {
    marginLeft: "-3.5rem",
  },

  img: {
    objectFit: "cover",
    borderRadius: "50%",
  },
});
