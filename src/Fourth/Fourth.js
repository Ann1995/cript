import React, { Component } from "react";
import styles from "./Fourth.scss";
import { Line } from "react-chartjs-2";
import Websocket from "react-websocket";
const initialState = {
  labels: new Array(10),
  datasets: [
    {
      label: "Current Bitcoin Dynamic",
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
      data: []
    }
  ]
};
class Currency4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    this.setState(initialState);
  }

  handleData(data) {
    var newData = [];
    const result = JSON.parse(data);

    for (var x = 0; x < this.state.labels.length; x++) {
      newData.push(result.events[0].price);
    }
    this.setState({ data: newData });

    var oldDataSet = this.state.datasets[0];
    var newData = this.state.data;
    var newDataSet = {
      ...oldDataSet
    };

    newDataSet.data = newData;
    var newState = {
      ...initialState,
      datasets: [newDataSet]
    };

    this.setState(newState);
  }
  componentDidMount() {}

  render() {
    return (
      <div className="fourth_wrapp">
        <Websocket
          url="wss://api.gemini.com/v1/marketdata/btcusd"
          onMessage={this.handleData.bind(this)}
        />
        <div className="schedule">
          <Line data={this.state} />
        </div>
      </div>
    );
  }
}
export default Currency4;
