import React, { Component } from 'react'
import './GraphicalData.css'



class GraphicalData extends Component {
  // Constructor
  constructor(props){
    super(props);
    this.state = {
      roombaLocation: this.props.results.requirements.initialRoombaLocation,
      matrix: this.props.results.matrix,
    }
  }

  //Display
  display = () => {
    this.setState({
      roombaLocation: this.props.results.requirements.initialRoombaLocation,
      matrix: this.props.results.matrix.map(inner => inner.slice())
    });
    
    for (let i = 0; i < this.props.results.output.length; i++){
      // delay the movements
      setTimeout(() => {
        this.updateLocation(this.props.results.output[i]);
      }, ((i+1) * 500));
    }
  }

  updateLocation = (currentStep) => {
    this.setState({ roombaLocation: currentStep.loc});
    if (this.state.matrix[currentStep.loc[0]][currentStep.loc[1]] === '*') {
      let tempMatrix = [...this.state.matrix];
      tempMatrix[currentStep.loc[0]][currentStep.loc[1]] = '';
      this.setState({
        matrix: tempMatrix
      })
    }
    
  }

  

  render() {
    
    return (
      <div className='graph-container'>
       
        {((this.props.results.matrix.length > 100) || (this.props.results.matrix[0].length > 100))
          ? <p className='error'>Due to the dimensions of the width or height exceeding 100 units, this cannot be visually displayed. Please refer to the table.</p>
          :<>
            <div className='buttons'>
              <button onClick={() => this.display()}>Start Roomba</button>
            </div>
            <table className={'graph-table'}>
              {this.state.matrix.map((col, colIndex) => 
                <tr>
                  {this.state.matrix[colIndex].map((row, rowIndex) =>
                    (this.state.roombaLocation[0] === colIndex && this.state.roombaLocation[1] === rowIndex)
                      ? <td ke y={String(colIndex+'-'+rowIndex)} className='block roomba'></td>
                      :(row === '*' )
                        ? <td key={String(colIndex+'-'+rowIndex)} className='block trash'></td>
                        : <td key={String(colIndex+'-'+rowIndex)} className='block'></td>
                  )}
                </tr>
              )}
            </table>
          </>
        }
        
      </div>
    );
  }
}

export default GraphicalData;