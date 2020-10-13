import React, { Component } from 'react'
import Files from "react-files";


import './FileUploader.css'

class FileUploader extends Component {
  constructor(props){
    super(props)
    this.state = {
        jsonFile: {}
    }

    this.fileReader = new FileReader();
    this.fileReader.onload = event => {
      this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
        this.props.callback(this.state.jsonFile);
      });
    };
  }

  render() {
    
    
    return (
        <div className="files">
        <Files
          className="files-dropzone"
          onChange={file => {
            this.fileReader.readAsText(file[file.length - 1]);
          }}
          onError={err => console.log(err)}
          accepts={[".json"]}
          multiple
          maxFiles={100}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
    );
  }
}

export default FileUploader;