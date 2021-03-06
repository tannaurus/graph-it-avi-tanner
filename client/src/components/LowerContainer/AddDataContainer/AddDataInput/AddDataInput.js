import React from 'react';
import {connect} from 'react-redux';
import {InputFeedback} from '../../../InputFeedback/InputFeedback.js';
import {handleNewData} from '../../../../redux/actions';
import './AddDataInput.css';

export class AddDataInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      dataFeedback: false,
      columnNameFeedback: false,
      cannotSubmit: false,
      notLongEnough: false
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const data = this.dataValue.value;
    const columnName = this.columnName.value;
    if(columnName.length === 0){
      this.setState({
        notLongEnough: true
      })
    }else{
      this.setState({
        notLongEnough: false
      })
    }

    if(this.state.dataFeedback || this.state.columnNameFeedback || this.state.notLongEnough){
      this.setState({
        cannotSubmit: true
      })
    }else{
      this.props.dispatch(handleNewData(data, columnName))
      this.dataValue.value = '';
      this.columnName.value = '';
    }
  }

  handleDataChange(e){
    console.log(Number(e.target.value))
    if(isNaN(Number(e.target.value))){
      this.setState({
        dataFeedback: true,
      })
    }else{
      this.setState({
        dataFeedback: false
      })
    }
  }

  handleNameChange(e){
    if(e.target.value.length > 12){
      this.setState({
        columnNameFeedback: true
      })
    }else{
      this.setState({
        columnNameFeedback: false
      })
    }
  }

  render(){
    if(this.state.notLongEnough){
      this.notLongEnough = <InputFeedback feedback={'This input cannot be left blank.'} />
    }else{
      this.notLongEnough = undefined;
    }

    if(this.state.dataFeedback){
      this.dataFeedback = <InputFeedback feedback={'This input must be a number.'}/>
    }else{
      this.dataFeedback = undefined
    }

    if(this.state.columnNameFeedback){
      this.nameFeedback = <InputFeedback feedback={'Just a little warning: column names should be kept short and sweet.'} />
    }else{
      this.nameFeedback = undefined;
    }

    if(this.state.cannotSubmit){
      this.cannotSubmit = <InputFeedback feedback={'Make sure both inputs are valid before submitting.'} />
    }else{
      // <InputFeedback>Make sure both inputs are valid before submitting.</InputFeedback>
      this.cannotSubmit = undefined;
    }
    return(
      <div className="input-container">
        <form className="inputForm">
          <label>Column data:</label><input ref={(dataValue) => this.dataValue = dataValue} onChange={(e) => this.handleDataChange(e)} type="text" placeholder="240k"></input>
          {this.dataFeedback}
          <label>Column name:</label><input ref={(name) => this.columnName = name} onChange={(e) => this.handleNameChange(e)} type="text" placeholder="Quarter 3 earnings"></input>
          {this.nameFeedback}
          {this.notLongEnough}
          <button onClick={(e) => this.handleSubmit(e)} type="submit" className="submit-button">Submit</button>
          {this.cannotSubmit}
        </form>
      </div>
    );
  }
}

export default connect()(AddDataInput)