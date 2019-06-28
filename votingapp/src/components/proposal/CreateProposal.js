import React, { Component } from "react";
import {
  Button,
  Box,
  TextField,
  CardHeader,
  Card,
  CardContent
} from "@material-ui/core";

export default class CreateProposal extends Component {
  render() {
    return (
      <div>
        <Box py={2} px={6}>
          <Card align="center">
            <CardHeader
              title="Create Offer"
              subheader="Fill in the form to make an offer"
            />
            <CardContent>
              <form>
                <TextField
                  label="Region"
                  type="text"
                  onChange={this.regionChangedHandler}
                  value=""
                  margin="normal"
                  variant="filled"
                />
                <br />
                <TextField
                  label="Product"
                  type="text"
                  onChange={this.productChangedHandler}
                  value=""
                  margin="normal"
                  variant="filled"
                />
              </form>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  }
}
