import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { ChannelListPage } from "./pages/ChannelListPage";
import { ChannelDetailPage } from "./pages/ChannelDetailPage";
import { spring, AnimatedSwitch } from "react-router-transition";
import { Box } from "@bigcommerce/big-design";

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles: any) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val: any) {
  return spring(val, {
    stiffness: 120,
    damping: 9
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0)
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1)
  }
};

const App: React.FC = () => {
  return (
    <Box style={{maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto'}}>
      <Router>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="route-wrapper"
        >
          <Route path="/" exact component={ChannelListPage} />
          <Route path="/channel/" component={ChannelDetailPage} />
        </AnimatedSwitch>
      </Router>
    </Box>
  );
};

export default App;
