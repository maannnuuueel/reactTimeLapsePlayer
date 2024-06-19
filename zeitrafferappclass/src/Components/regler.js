import React from 'react';
import './regler.css';

const schritteAnzahl=20;

class Regler extends React.Component {

  constructor () {
    super();

    this.Werte = [];

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      rerender: false,
    }
  }

  componentDidMount () {
    let tmp =[];

    for(let i = 0; i < schritteAnzahl; i++) {
      tmp.push(0);
    }
    tmp[this.props.playSpeed] = 1;

    this.Werte = tmp;
    console.log(this.Werte);
  }

  componentDidUpdate (prevProps) {
    
    if (this.props.playSpeed !== prevProps.playSpeed) {
      this.Werte[prevProps.playSpeed] = 0;
      this.Werte[this.props.playSpeed] = 1;

      this.setState({rerender: !this.state.rerender});
    }
  }

  handleClick (wertId) {
    this.props.handleClick(wertId);
  }
 
  render () {

    return (
      <div className="Regler">
        {this.Werte.map((wert,id) => <Zeitpunkt active={wert} Id={id} key={id} Click={this.handleClick} />)}
      </div>
    );
  }

}

function Zeitpunkt ({active,Id, Click}) {
  const handleClick = () => {Click(Id);console.log(Id);}

  return(
      <div className={active ? "WertActive" : "Wert"} style={{ width: `${60 / schritteAnzahl}%` }} onClick={handleClick} />
  );
} 

export default Regler;
