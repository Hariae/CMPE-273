import React, {Component} from 'react';
import axios from 'axios';

class Calculator extends Component{

    constructor(){
        super();

        this.state={
            expression:""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    handleInputChange = (e) => {
        this.setState({
            expression: e.target.value
        });
    }

    handleClick = (e) =>{
        this.setState({
            expression : this.state.expression.concat(e.target.value)
        })
    }

    evaluate = (e) =>{
        e.preventDefault();
        
        var data = {
            expression: this.state.expression
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3010/calculate', data)
            .then(response=>{
                if(response.status === 200){
                    console.log('Status: ', response.status);
                    this.setState({
                        expression: response.data
                    });
                    console.log('Response:', response.data);
                }
            })

    }



    render(){
        return(
            <div className="center-content">
                <div className="calc-content">
                    <div className="form-group">                        
                        <table className="table table-dark table-bordered">
                            <tbody>
                                <tr>
                                    <td colSpan="4">
                                        <input type="text" name="evaluate" id="evaluate" className="form-control form-control-lg" placeholder="0" onChange={this.handleInputChange} value={this.state.expression}/>        
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button className="btn btn-info" value="+" onClick={this.handleClick}><strong>+</strong></button>
                                    </td>    
                                    <td>
                                        <button className="btn btn-info" value="-" onClick={this.handleClick}><strong>-</strong></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-info" value="/" onClick={this.handleClick}><strong>/</strong></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-info" value="*" onClick={this.handleClick}><strong>*</strong></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4"><button className="btn btn-success" onClick={this.evaluate}><strong>=</strong></button></td>
                                </tr>
                            </tbody>                        
                        </table>                        
                    </div>                    
                </div>
            </div>
        )
    }
}

export default Calculator;