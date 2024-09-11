import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          MyApp
        </Typography>
        <Button color="inherit">
          <Link to="/signin" className={classes.link}>
            Sign In
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/signup" className={classes.link}>
            Sign Up
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
