import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { connect } from "react-redux";
import "./GraphContainer.css";

export class GraphContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="graph-container">
        <VictoryChart domainPadding={24}>
          <VictoryBar data={this.props.graphData} x={"index"} y={"data"} />
          <VictoryAxis
            tickValues={this.props.columnCount}
            tickFormat={this.props.columnNames}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={x => `${this.props.prefix}${x}${this.props.suffix}`}
          />
        </VictoryChart>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  graphData: state.graphData,
  columnNames: state.graphData
    .filter(bar => bar.columnName)
    .map(item => item.columnName),
  columnCount: state.graphData.filter(bar => bar.index).map(item => item.index),
  prefix: state.prefix,
  suffix: state.suffix,
  title: state.graphTitle
});

export default connect(mapStateToProps)(GraphContainer);
