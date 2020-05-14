import React, { Component, Fragment } from "react";
import { Form, Button, Input, Grid } from "semantic-ui-react";

import noteService from "../services/noteService";

class NewReport extends Component {
  state = {
    name: "",
    phoneNo: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //   handleFile = (e) => {
  //     const file = e.target.files[0];
  //     this.setState({ file });
  //   };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phoneNo } = this.state;

    const data = {
      name,
      phoneNo,
    };
    let res;
    if (this.state.report) {
      const formData = new FormData();
      // formData.append("file", this.state.file);
      formData.append("data", JSON.stringify(data));
      res = await noteService.addReport(formData);
    } else {
      res = await noteService.addReport(data);
    }

    this.props.history.push("/");
  };

  render() {
    const { name, phoneNo } = this.state;
    return (
      <Grid container>
        <Grid.Column>
          <Button
            icon="arrow left"
            size="huge"
            onClick={() => this.props.history.goBack()}
          />
        </Grid.Column>
        <Form size="big" style={{ width: "70%", margin: "0 auto" }}>
          <Form.Input
            label="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Enter name of patient"
          />
          <Form.TextArea
            label="PhoenNo"
            name="phoneNo"
            value={phoneNo}
            onChange={this.handleChange}
            placeholder="add PhoneNo of patient"
            rows={10}
          />

          <Button
            type="submit"
            onClick={this.handleSubmit}
            inverted
            color="blue"
            floated="right"
          >
            Add Report
          </Button>
        </Form>
      </Grid>
    );
  }
}

export default NewReport;
