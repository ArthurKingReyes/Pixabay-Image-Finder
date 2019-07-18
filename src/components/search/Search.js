import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

export default class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiURL: 'https://pixabay.com/api',
        apiKey: '13062937-0cbc23221550348bc6305b0db',
        images: []
    }
    
    // show text input
    onTextChange = (e) => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val}, () => {
            if (val === '') {
                this.setState({images: []});
            } else {
                axios.get(`${this.state.apiURL}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({images: res.data.hits}))
                .catch(err => console.log(err));
            }           
        });
    }

    onAmountChange = (e, index, value) => this.setState({amount: value})

    render() {
        console.log(this.state.images)
        return (
            <div>
                <TextField 
                    style={{paddingLeft: '2em', margin: 'auto'}}
                    name="searchText"
                    value= {this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search For Images"
                /> 
                <br/>

                <SelectField
                    style={{paddingLeft: '2em', margin: 'auto'}}
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br/>

                {this.state.images.length > 0 ? (<ImageResults images={this.state.images}/>) : null}
            </div>
        )
    }
}
