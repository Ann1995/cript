import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import styles from "./Third.scss";
{
  /* <Doughnut data={this.state.values} /> */
}

class Currency3 extends Component {
  constructor() {
    super();
    this.state = {
      values: {},
      sortby: "day",
      char: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
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
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  estimation() {}

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
    this.setState({ sortby: event.target.value });
    var kind = this.state.sortby;
    var url;
    if (kind == "month") {
      var monthago = yyyy + "-" + (mm - 1) + "-" + dd;
      url =
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
        monthago +
        "&end=" +
        today +
        "";
    } else if (kind == "year") {
      var yearago = yyyy - 1 + "-" + mm + "-" + dd;
      url =
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=" +
        yearago +
        "&end=" +
        today +
        "";
    } else if (kind == "day") {
      url =
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-04-01&end=2018-04-30";
    }
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        console.log(res);
        console.log(res.bpi);
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
      <div>
        <div>
          <select onChange={this.handleChange}>
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        <div>
          <div className="col-sm-12 card_main ">
            <div className="card">
              <Line data={this.state.char} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Currency3;
