import React, {Component} from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import appStyles from '../App.css';
import FontIcon from 'material-ui/FontIcon';
import {yellow500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class Mentors extends Component {

  constructor() {
    super();
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
      dialogOpen: false,
      selectedUser: {},
      requestMessage: '',
      topic: ''
    };

    this.handleMessageRequest = this.handleMessageRequest.bind(this);
    this.getTagColor = this.getTagColor.bind(this);
    this.onReqMessageChange = this.onReqMessageChange.bind(this);
    this.onTopicChange = this.onTopicChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTagColor(tag) {
    return this.props.selectedTags.indexOf(tag) !== -1 ? 'matching-tag': 'simple-tag';
  }

  handleMessageRequest(e, user) {
    this.setState({selectedUser: user})
    this.setState({dialogOpen: true})
  }

  handleClose = () => {
    this.setState({dialogOpen: false,
      requestMessage: ''});
  };

  handleSubmit = () => {
    this.props.handleMessageRequest(this.state.selectedUser, this.state.requestMessage, this.state.topic);
    this.setState({dialogOpen: false,
      requestMessage: ''});
  }

  onReqMessageChange(e) {
    this.setState({requestMessage: e.target.value})
  }

  onTopicChange(e) {
    this.setState({topic: e.target.value});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Tags</TableHeaderColumn>
              <TableHeaderColumn> </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.tableData.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.profile.name}</TableRowColumn>
                <TableRowColumn>
                  {row.profile.tags.map((tag, ind) => <span className={"tag " + this.getTagColor(tag.name)} key={ind}><span className="rating">{tag.rating} 
                    <FontIcon className="material-icons rating-star" color={yellow500}>star</FontIcon></span>{tag.name}</span>)}
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton icon={<FontIcon className="material-icons message">message</FontIcon>} 
                    primary={true} 
                    label="Ask"
                    labelPosition="before"
                    onClick={(e) => this.handleMessageRequest(e, row)}/>
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            
          </TableFooter>
        </Table>
        <Dialog
          title={"Message request for " + this.state.selectedUser.name}
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}
        >
          <TextField
              floatingLabelText="Who are you?"
              fullWidth={true}
              value={this.state.topic}
              onChange={this.onTopicChange}
            />
        
          <TextField
            floatingLabelText="What do you want to talk about?"
            multiLine={true}
            rows={2}
            fullWidth={true}
            value={this.state.requestMessage}
            onChange={this.onReqMessageChange}
          />
          
        </Dialog>
      </div>
    );
  }
}