import React, { Component } from 'react'
import {Route, Switch, withRouter} from 'react-router-dom';
import GraphicalData from './Components/GraphicalData/GraphicalData';
import TableData from './Components/TableData/TableData';
import calculate from './calculation';
import FileUploader from './Components/FileUploader/FileUploader'

import './style.css'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataResult: '',
      results: {},
      data: null,
      matrix: [],
      tooLarge: false,
    }
  }

  setData = (data) => {
    let matrix = [];

    if (data.roomDimensions[0] < 10000 && data.roomDimensions[1] < 10000) {
      for (let i = 0; i < data.roomDimensions[1]; i++) {
        matrix[i] = [];
        for(let j = 0; j < data.roomDimensions[0]; j++) {
          matrix[i][j] = '';
        }
      }
         
      // add the trash
      data.dirtLocations.forEach((cordinates,i) => {
        matrix[ cordinates[1] ][ cordinates[0] ] = '*'
      });

      this.setState({
        tooLarge: false
      });
    }
    else {
      this.setState({
        tooLarge: true
      });
    }
  
    this.setState({
      data: data,
      matrix: matrix
    });
  }

  btnUpload = (dataResult) => {
    this.setState({
      dataResult: dataResult
    });
  }

  render() {
    let results;
    if (this.state.dataResult) {
      results = calculate(this.state.matrix, 
        [{step: 1, loc: this.state.data.initialRoombaLocation, dirt: 0, wallsHit: 0}],
        1,
        this.state.data.initialRoombaLocation,
        this.state.data.drivingInstructions.length,
        this.state.data);

      if (!this.state.results) {
        this.setState({
          results: results
        });
      }
    }
    
    if (this.state.data === null) {
      console.log('%cView my Resume Here:', 'border: 1px solid black; background-color: black; color: white; padding: 10px; border-radius: 10px; border: 1px solid white;');
      console.log( '%chttps://ezg97.github.io/Portfolio/', 'border: 1px solid black; background-color: black; color: white; padding: 10px; border-radius: 10px; border: 1px solid white;');
    }

    return (
      <main className='App'>
        <h1>Roomba Coding Challenge</h1>

        <FileUploader callback={(data) => this.setData(data)}/>

        {(this.state.data)
          ? (!this.state.tooLarge)
            ? <div className="buttons">
                <button onClick={() => this.btnUpload('table')}>Table</button>
                <button onClick={() => this.btnUpload('graphical')}>Graphical</button>
              </div>
            : <p className='error'>The room dimensions (width or height) has exceeded 10,000 units, the units must be less than 10,000 to display the results.</p>
          : null
        }
                
        {(this.state.dataResult.length > 0) 
          ? (this.state.dataResult === 'table')
            ? <TableData results={results}/>
            : <GraphicalData results={results}/>
          : null
        }

      </main>
    );
  }
}

export default withRouter(App);