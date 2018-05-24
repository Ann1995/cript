import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import styles from "./Third.scss";

class Currency3 extends Component {
  constructor() {
    super();
    this.state = {
      values: {},
      sortby: "month",
      char: {
        labels: [],
        datasets: []
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.handleChange();
  }
  handleChange;

  handleChange(event) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    if (event) {
      this.setState({ sortby: event.target.value });
      var kind = event.target.value;
    } else {
      var kind = this.state.sortby;
    }
    var url;
    if (kind === "month") {
      if (mm < 10) {
        mm = "0" + (mm - 1);
      }
      var monthago = yyyy + "-" + mm + "-" + dd;
      url =
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
        monthago +
        "&end=" +
        today +
        "";
    } else if (kind === "year") {
      var yearago = yyyy - 1 + "-" + mm + "-" + dd;
      url =
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
        yearago +
        "&end=" +
        today +
        "";
    }
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        this.setState({
          values: res.bpi,
          char: {
            ...this.state.char,
            labels: Object.keys(res.bpi)
          }
        });
        this.setState({
          char: {
            ...this.state.char,
            datasets: [
              {
                label: "BTC",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: Object.values(res.bpi)
              }
            ]
          }
        });
      });
  }

  render() {
    return (
      <div className="wrapp_third">
        <div>
          <select className="inner_select" onChange={this.handleChange}>
            <option value="month"> Month </option>
            <option value="year"> Year </option>
          </select>
        </div>
        <div>
          <div className="col-sm-12 card_main ">
            <div className="schedule">
              <Line data={this.state.char} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Currency3;
