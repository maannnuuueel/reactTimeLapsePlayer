import React from 'react';

import './zeitleiste.css';

class Zeitleiste extends React.Component {

  constructor () {
    super();

    this.state = {
    	rerender: 0,
    };

    this.framess =[];

    this.handleClick = this.handleClick.bind(this);
  }



  componentDidMount () {

    let tmp =[];

    for(let i = 0; i < this.props.FrameAnzahl; i++) {
      tmp.push({id: i, active:0});
    }

    console.log(tmp);
    tmp[this.props.zeit].active = 1;
    this.framess = tmp;
  }

  componentDidUpdate (prevProps) {
    
  	if (this.props.zeit !== prevProps.zeit) {
  		this.framess[prevProps.zeit].active = 0;
	    this.framess[this.props.zeit].active = 1;

	    this.setState({rerender: !this.state.rerender});
	}
  }


  handleClick (frameId) {
  	this.props.handleClick(frameId);
  }

  render () {

    return (
      <div className="Zeitleiste">
        {this.framess.map((frame,id) => <Zeitpunkt id={id} active={frame.active} Anz={this.props.FrameAnzahl} Click={this.handleClick} key={id} /> )}
      </div>
    );
  }

}

function Zeitpunkt ({active,Anz,id, Click}) {
	const handleClick = () => {Click(id);console.log(id);}

	return(
			<div className={active ? "FrameActive" : "Frame"} style={{ width: `${90 / Anz}%` }} onClick={handleClick} />
	);
} 

export default Zeitleiste;
