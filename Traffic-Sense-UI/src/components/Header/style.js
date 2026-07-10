import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    height: "7vh",
    width: "100vw",
    padding: "0vh 2vw",
    color: theme.palette.background,
    display: "flex",
    alignItems: "center",
  },
  AItext: {
    fontSize: "1rem",
    marginLeft: "0.4vw",
    fontWeight: "bold",
  },
  rightVersion: {
    marginLeft: "auto",
    fontWeight: "bold",
    fontSize: "0.8rem",
  }
}));

export default useStyles;
