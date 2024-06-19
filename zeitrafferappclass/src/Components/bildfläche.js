import React from 'react';


import './bildfläche.css';

const BilderAnzahl = 99;

class Bildfläche extends React.Component {

  constructor () {
    super();

    this.latestBild = "";

    this.zeitToBildId = this.zeitToBildId.bind(this);
  }


  componentDidMount () {
    this.latestBild = this.findLastModified();
    console.log(this.latestBild);

    //alle 3 bis 4 minuten checken ob es neues aktuelleres gibt
    //interval();
  }
  
  getLastModified (url, wch) {           
        try {
            var req=new XMLHttpRequest();
            req.open("HEAD", url, false);
            req.send(null);
            if(req.status === 200){
                return req.getResponseHeader(wch);
            }
            else return false;
        } catch(er) {
            return er.message;
        }
  }

  findLastModified () {
    //let bilder = [];
    let tmpId = 1;
    let tmpLastModified = 0;

    let urlBild = "";

    for(let i = 1; i <= BilderAnzahl; i++) {
      //alternativ mit stellen von i: (i + "").length

      urlBild = this.BildIdToBildName(i);

      if(tmpLastModified > this.getLastModified(urlBild,'Last-Modified')) {
        tmpLastModified = this.getLastModified(urlBild,'Last-Modified');
        tmpId = i;
      }
      
      //bilder.push(this.getLastModified(urlBild,'Last-Modified'));
    }

    //return bilder.indexOf(Math.max(...bilder));

    return tmpId;
  }
  
  zeitToBildId () {
    //this.latestBild bei frame Null, modulo
    let Num = this.latestBild + this.props.zeit;
    return Num % BilderAnzahl;
  }

  BildIdToBildName (BildId) {

    if(BildId < 10) {
      return `http://localhost:3000/bilder/Totale0000${BildId}.jpg`;
    } else if(10 <= BildId && BildId < 100) { 
      return `http://localhost:3000/bilder/Totale000${BildId}.jpg`;
    } else if(100 <= BildId && BildId < 1000) { 
      return `http://localhost:3000/bilder/Totale00${BildId}.jpg`;
    }
  }

  render () {

    return (
        <div className="Bildfläche" >
          <img src={this.BildIdToBildName(this.zeitToBildId())} style={{width: "70%",transform: "translate(50%,0)"}} alt="banane" /> 
          <img className="OverLay" src={"http://localhost:3000/bilder/LabelsOverlay.png"} style={{width: "70%",transform: "translate(-50%,0)"}} alt="overlay" />
        </div>
    );
  }

}

export default Bildfläche;
