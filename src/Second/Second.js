import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import styles from './Second.scss'; 
{/* <Doughnut data={this.state.values} /> */}
const Item = (props) => {

    return (
        <div key={props.key} className="col-sm-12 card_main ">
            <div className="card">
                <div className="card-body">
              
                    <div className="row">
                        <div className="col-sm-6">{props.name}</div>
                        <div className="col-sm-6">{props.prise}</div>
                     </div>
                </div>
            </div>
        </div>
    )
};
class Currency2 extends Component {
    constructor() {
        super();
        this.state = {
            values: [],
            valuefirst: '',
            key: '',
            prise: '',
            name: ''

        };

        this.update = this
            .update
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange(event) {
        this.setState({
            valuefirst: event.target.value
        }, this.update);
        console.log(event.target.value);
    }
    update() {
        var url = 'https://api.coinmarketcap.com/v2/ticker/?convert=' + this.state.valuefirst + '&limit=6';
        fetch(url)
            .then(resp => resp.json())
            .then((data) => {
                console.log(data['data']);
                
                const a = Object.values(data['data'])
                this.setState({values: a});
            });
    }
    render() {
        return (

            <div className="main">
                <h1>Cryptocurrency Converter Calculator</h1>
                <input type="number"/>
                <select name="" id="">
                    <option value="Bitcoin">Bitcoin</option>
                    <option value="Litecoin">Litecoin</option>
                    <option value="Ripple">Ripple</option>
                    <option value="Bitcoin">Ethereum</option>
                    <option value="Litecoin">EOS</option>
                    <option value="Ripple">Bitcoin Cash</option>
                </select>
                <button>=</button>
                <select name="" id="">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                </select>

                <div>
                    {(this.state.values)
                        ? this.state.values.map((el, i) => <Item 
                        name={el.name} 
                        key={i} 
                        prise={el.quotes[Object.keys(el.quotes)[0]].price}>
                        </Item>)
                        : <div className="empty_erro">No values</div>
}
                </div>
                <div>
                    <select name="" id="">
                    <option>Select</option>
                    <option>Day</option>
                    <option>Month</option>
                   <option>Year</option>
                </select>
                </div>
<div>
     {/* <Doughnut ref='chart' data={data} /> */}
</div>
            </div>
        );
    }
}

export default Currency2;
