import React from 'react';

import './bedienleiste.css';
import Regler from './regler.js';

class Bedienleiste extends React.Component {

  constructor () {
    super();
  }

  render () {

    return (
      <div className="Bedienleiste">
        <div className="Links" >
          {this.props.playOn ? 
            <div className="Button" onClick={this.props.handlePause} > 
              <img src="http://localhost:3000/icons/pause.png" alt="fullscreen" className="icon" />
            </div> : <div className="Button" onClick={this.props.handlePlay} > 
              <img src="http://localhost:3000/icons/play.png" alt="play" className="icon" /> 
            </div>}
          <div className="Button" onClick={this.props.handleStop} > 
            <img src="http://localhost:3000/icons/stop.png" alt="stop" className="icon" /> 
          </div>
          <Regler handleClick={this.props.handleSpeed} playSpeed={this.props.playSpeed} />
        </div>
        <div className="Rechts" >
          <div className="Button" > 
            <img src="http://localhost:3000/icons/fullscreen.png" alt="fullscreen" className="icon" />
          </div>
        </div>
      </div>
    );
  }

}

export default Bedienleiste;
