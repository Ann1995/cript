import React, { Component } from "react";
import styles from "./Second.scss";

class Currency2 extends Component {
  constructor() {
    super();
    this.state = {
      values: {},
      valuenumb: 0,
      valuecript: "1",
      textcript: "Bitcoin",
      valuecurrency: "USD",
      price: 0,
      newprice: "0"
    };

    this.update = this.update.bind(this);
  }

  estimation() {
    this.update();
  }

  handleChange(param, event) {
    if (param == "number") {
      this.setState({
        valuenumb: Number(event.target.value)
      });
    }
    if (param == "cripta") {
      var index = event.nativeEvent.target.selectedIndex;

      this.setState({
        valuecript: event.target.value,
        textcript: event.nativeEvent.target[index].text
      });
    }
    if (param == "currency") {
      this.setState({
        valuecurrency: event.target.value
      });
    }
  }
  update() {
    var url =
      "https://api.coinmarketcap.com/v2/ticker/" +
      this.state.valuecript +
      "/?convert=" +
      this.state.valuecurrency +
      "";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ values: data.data });

        this.setState({
          price: data.data.quotes[Object.keys(data.data.quotes)[0]].price
        });
      });
    this.setState({
      newprice: this.state.price * this.state.valuenumb
    });
  }
  render() {
    return (
      <div className="main">
        <h1> Cryptocurrency Converter Calculator </h1>
        <div className="number_wrapp">
          <input
            value={this.state.valuenumb}
            onChange={this.handleChange.bind(this, "number")}
            type="number"
            min="0"
          />
        </div>
        <div className="wrapp_main">
          <select onChange={this.handleChange.bind(this, "cripta")}>
            <option value="1"> Bitcoin </option>
            <option value="2"> Litecoin </option>
            <option value="3"> Namecoin </option>
            <option value="4"> Terracoin </option>
            <option value="5"> Peercoin </option>
            <option value="6"> Novacoin </option>
          </select>
          <button onClick={this.estimation.bind(this)}>= </button>
          <select onChange={this.handleChange.bind(this, "currency")}>
            <option value="USD"> USD </option>
            <option value="EUR"> EUR </option>
            <option value="RUB"> RUB </option>
          </select>
        </div>
        <div>
          <div className="col-sm-12 card_main ">
            <div className="card">
              <div className="card-body">
                <p id="numb">
                  {this.state.valuenumb} {this.state.textcript}
                </p>
                <p>
                  {this.state.newprice} {this.state.valuecurrency}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Currency2;
