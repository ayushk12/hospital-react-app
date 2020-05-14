import React, { Component, Fragment } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Moment from "react-moment";

import reportService from "../services/reportService";

const colorTheme = [
  { color: "#f54290" },
  { color: "orange" },
  { color: "violet" },
  { color: "#34eb80" },
  { color: "#34d3eb" },
];

const len = colorTheme.length;

class Home extends Component {
  state = {
    report: [],
  };

  editNote = (report) => {
    this.props.history.push({
      pathname: "/editReport",
      state: { report },
    });
  };

  newReport = () => {
    this.props.history.push("/newReport");
  };

  async componentDidMount() {
    const reports = await reportService.getReports();
    console.log("data", reports.data);
    this.setState({
      reports: [...this.state.reports, ...reports.data],
    });
  }

  renderNotesCard = (reports) => {
    return reports.map((report, i) => {
      return (
        <Grid.Column key={report._id}>
          <Card
            style={{
              margin: "20px 0px",
              background: `${colorTheme[i % len].color}`,
            }}
            className="card__frame"
            onClick={() => this.editNote(report)}
          >
            <Card.Content>
              <Card.Header>{report.name}</Card.Header>
              <Card.Meta>
                Created At{` `}
                <Moment date={report.createdAt} format="DD-MMM-YYYY" />
              </Card.Meta>
              <Card.Description>{report.phoneNo}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  };

  render() {
    const { reports } = this.state;
    return (
      <Grid centered columns={2} style={{ position: "relative" }}>
        <Grid.Column width={1}>
          <Button
            circular
            size="massive"
            icon="add"
            inverted
            color="green"
            onClick={this.newReport}
            style={{ position: "fixed", top: "15vh", left: "4vw" }}
          />
        </Grid.Column>

        <Grid.Column width={13}>
          {reports && reports.length > 0 && (
            <Grid centered columns={4}>
              <Grid.Row>{this.renderNotesCard(reports)}</Grid.Row>
            </Grid>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Home;
