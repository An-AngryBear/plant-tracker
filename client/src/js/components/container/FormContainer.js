import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import { webScrape } from '../../factories/Scraper-Factory'
class FormContainer extends Component {
    constructor() {
        super();
        this.state = {
            plant_name: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        const { plant_name } = this.state;
        return (
            <form id="article-form" >
                <Input
                    text="Enter Plant Name"
                    label="plant_name"
                    type="text"
                    id="plant_name"
                    value={plant_name}
                    handleChange={this.handleChange}
                />
                <button type="submit" onClick={scraper} >click</button>
            </form>
        );
    }
}

export default FormContainer;
let scraper = (e) => {
    e.preventDefault();
    let inputVal = document.getElementById("plant_name").value;
    webScrape(inputVal);
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;