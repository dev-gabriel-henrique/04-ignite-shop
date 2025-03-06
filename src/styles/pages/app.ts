import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  button: {
    padding: "0.75rem",
    backgroundColor: " $gray800",
    border: 0,
    color: " $gray300",
    borderRadius: 6,
    cursor: "pointer",
    
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "$green500",
      color: "$white"
    },
  },
});
