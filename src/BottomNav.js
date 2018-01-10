import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const icon = <FontIcon ></FontIcon>;



class BottomNav extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation style={{height: 40, position: 'fixed', bottom: 0, color:'#fff', backgroundColor: '#212121'}}
   
        >
          <BottomNavigationItem
            className="bottom-nav"
            label="GitHub"
            icon={icon}
            style={{color: '#fff'}}
            onClick={() => window.open('https://github.com/mona87/muse')}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;