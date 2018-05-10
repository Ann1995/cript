import React, { Component } from "react";
import styles from "./First.scss";
const Item = props => {
  return (
    <div key={props.key} className="col-sm-12 card_main ">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6"> {props.name} </div>
            <div className="col-sm-6"> {props.prise} </div>
          </div>
        </div>
      </div>
    </div>
  );
};
class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      valuefirst: "EUR",
      key: "",
      prise: "",
      name: ""
    };

    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.update();
  }
  handleChange = event => {
    this.setState({ valuefirst: event.target.value }, () => {
      this.update();
    });
  };
  update() {
    var url =
      "https://api.coinmarketcap.com/v2/ticker/?convert=" +
      this.state.valuefirst +
      "&limit=6";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const a = Object.values(data["data"]);
        this.setState({ values: a });
      });
  }
  render() {
    return (
      <div className="App-First">
        <select
          value={this.state.valuefirst}
          className="allwidth"
          onChange={this.handleChange} >
          <option value="USD"> USD </option>
          <option value="EUR"> EUR </option>
          <option value="RUB"> RUB </option>
        </select>

        <div className="flex">
          {this.state.values ? (
            this.state.values.map((el, i) => (
              <Item
                name={el.name}
                key={i}
                prise={el.quotes[Object.keys(el.quotes)[0]].price}
              />
            ))
          ) : (
            <div className="empty_erro"> No values </div>
          )}
        </div>
      </div>
    );
  }
}

export default Currency;
