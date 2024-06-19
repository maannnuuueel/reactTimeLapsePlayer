import React from 'react';

import './App.css';
import Zeitleiste from './Components/zeitleiste.js';
import Bildfläche from './Components/bildfläche.js';
import Bedienleiste from './Components/bedienleiste.js';

const FrameAnzahl = 100;
const schritteAnzahl = 20;

class App extends React.Component {

  constructor () {
    super();

    this.state = {
      zeit: 0,  
      playOn: false,

      playSpeed:2,
    };

    this.playInterval = 0;
    this.nextFrame = this.nextFrame.bind(this);
    this.setFrame = this.setFrame.bind(this);

    this.playFrames = this.playFrames.bind(this);
    this.stopFrames = this.stopFrames.bind(this);
    this.pauseFrames = this.pauseFrames.bind(this);

  }

  nextFrame () {
    if(this.state.zeit < FrameAnzahl-1) {
      this.setState((state) => ({zeit: state.zeit + 1}));
    } else {
      this.stopFrames();
    }
  }

  setFrame = (pkt) => {
    this.setState((state) => ({zeit: pkt}));
  }

  componentDidMount () {
    let tmp =[];

    for(let i = 0; i < FrameAnzahl; i++) {
      tmp.push({id: i, active:0});
    }

    tmp[this.state.zeit].active = 1;
    this.setState({frames: tmp});
    
  }

  playFrames = () => {
    this.playInterval = setInterval(this.nextFrame,170 - this.state.playSpeed * (100/schritteAnzahl)); 
    this.setState({playOn: true});
    console.log(20 + this.state.playSpeed * (100/schritteAnzahl));
  }

  stopFrames = () => {
    clearInterval(this.playInterval);
    this.setFrame(0);
    this.setState({playOn: false});
  }

  pauseFrames = () => {
    clearInterval(this.playInterval);
    this.setState({playOn: false});
  }

  setSpeed = (geschw) => {
    this.setState({playSpeed: geschw});
  }

  render () {

    return (
      <div className="App">
        <Bildfläche zeit={this.state.zeit} />
        <Zeitleiste zeit={this.state.zeit} FrameAnzahl={FrameAnzahl} handleClick={this.setFrame} />
        <Bedienleiste handlePause={this.pauseFrames} handlePlay={this.playFrames} playOn={this.state.playOn} handleStop={this.stopFrames} playSpeed={this.state.playSpeed} handleSpeed={this.setSpeed} />
      </div>
    );
  }

}

export default App;
