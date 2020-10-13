import React, { Component } from 'react'
import './TableData.css'



class TableData extends Component {
  constructor(props){
    super(props)
    this.state = {
    }

  }

  render() {
    let count=0;
    this.props.results.output.forEach((element) => {
      if(element.action) {
        return count++;
      }
    });

    return (
      <div className='table-container'>
        {/* content goes here */}
        <h1>Results:</h1>
        <table className="table">
                <tr>
                    <th>Step</th>
                    <th>Roomba Location</th>
                    <th>Action</th>
                    <th>Total Dirt Collected</th>
                    <th>Total Wall Hits</th>
                </tr>
              {this.props.results.output.map(({ step, loc, dirt, wallsHit, action }) => (
                <>
                <tr key={step}>
                    <td>{step}</td>
                    <td>{loc[1]}, {loc[0]}</td>
                    <td>{action}</td>
                    <td>{dirt}</td>
                    <td>{wallsHit}</td>
                </tr>
                </>
                ))}
        </table>
        
        <ul>
              <li><p>Final Position: &nbsp; <span> {this.props.results.output[this.props.results.output.length-1].loc[1]}, {this.props.results.output[this.props.results.output.length-1].loc[0]}</span> </p></li>
              <li><p>Total Dirt Collected: &nbsp; <span> {this.props.results.output[this.props.results.output.length-1].dirt}</span> </p></li>
              <li><p>Total Distance Traveled: &nbsp; <span> {count} </span> </p></li>
              <li><p>Total Walls Hit: &nbsp; <span> {this.props.results.output[this.props.results.output.length-1].wallsHit}</span> </p></li>

        </ul>
      </div>
    );
  }
}

export default TableData;