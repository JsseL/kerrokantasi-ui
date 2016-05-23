import React from 'react';
import {FormattedMessage} from 'react-intl';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';
import Icon from 'utils/Icon';
import CommentDisclaimer from './CommentDisclaimer';

class BaseCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {collapsed: true, commentText: ""};
  }

  toggle() {
    this.setState({collapsed: !this.state.collapsed});
  }

  handleTextChange(event) {
    this.setState({commentText: event.target.value});
  }

  clearCommentText() {
    this.setState({commentText: ""});
  }

  submitComment() {
    let pluginData = this.getPluginData();
    if (pluginData && typeof pluginData !== "string") {
      pluginData = JSON.stringify(pluginData);
    }
    this.props.onPostComment(
      this.state.commentText,
      pluginData
    );
    this.clearCommentText();
  }

  getPluginData() {
    return undefined;
  }

  render() {
    if (!this.state.collapsed) {
      return (<div className="comment-form">
        <form>
          <h3><FormattedMessage id="writeComment"/></h3>
          <Input type="textarea" value={this.state.commentText} onChange={this.handleTextChange.bind(this)}/>
          <div className="comment-buttons clearfix">
            <Button bsStyle="warning" onClick={this.toggle.bind(this)}>
              <FormattedMessage id="cancel"/>
            </Button>
            <Button bsStyle="primary" className="pull-right" onClick={this.submitComment.bind(this)}>
              <FormattedMessage id="submit"/>
            </Button>
          </div>
          <CommentDisclaimer/>
        </form>
      </div>);
    }
    return (<Button onClick={this.toggle.bind(this)} bsStyle="primary">
      <Icon name="comment"/> <FormattedMessage id="addComment"/>
    </Button>);
  }
}

BaseCommentForm.propTypes = {
  onPostComment: React.PropTypes.func
};

export default BaseCommentForm;
