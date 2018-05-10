import React, { Component } from "react";

const Item = props => {
  return (
    <div key={props.key} className="col-sm-12 card_main ">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6"> {props.name} </div>{" "}
            <div className="col-sm-6"> {props.prise} </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
class Currency extends Component {
  constructor() {
    super();
    this.state = {
      values: [],
      valuefirst: "",
      key: "",
      prise: "",
      name: ""
    };

    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        valuefirst: event.target.value
      },
      this.update
    );
  }
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
      <div className="App">
        <h1> first </h1>{" "}
        <select className="allwidth" onChange={this.handleChange}>
          <option value=""> Select </option> <option value="USD"> USD </option>{" "}
          <option value="EUR"> EUR </option> <option value="RUB"> RUB </option>{" "}
        </select>
        <div>
          {" "}
          {this.state.values ? (
            this.state.values.map((el, i) => (
              <Item
                name={el.name}
                key={i}
                prise={el.quotes[Object.keys(el.quotes)[0]].price}
              >
                {" "}
              </Item>
            ))
          ) : (
            <div className="empty_erro"> No values </div>
          )}{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Currency;
