import React from "react";

import useStyles from "./style";

const Header = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      Traffic Sense <span className={classes.AItext}> AI</span>
      <div className={classes.rightVersion}>
        <span className={classes.versionText}>Faster Roads, Smarter Commutes.</span>
          </div>
    </div>
  );
};

export default Header;
