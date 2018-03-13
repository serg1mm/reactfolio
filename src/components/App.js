import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getNotes, saveNote, deleteNote } from '../actions/notesAction';
import NoteCard from './NoteCard';
import { getUser } from '../actions/userAction';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment/locale/es';

class App extends Component {
    constructor(props) {
        super(props);
        // state
        this.state = {
            title: '',
            body: '',
            date: new moment().format(),
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
    }

    // handle change
    handleChange(e) {
        this.setState({body: e});
    }

    componentDidMount(){
        this.timerID = setInterval(
        () => this.tick(),
        1000
      );
      }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        date: new Date()
      });
    }

    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        const note = {
            title: this.state.title,
            body: this.state.body,
            uid: this.props.user.uid,
            author: this.props.user.displayName,
            date: new moment().format()
        };
        this.props.saveNote(note);
        this.setState({
            title: '',
            body: '',
            author: '',
            date: ''
        });
    }

    // render notes
    renderNotes() {
        return _.map(this.props.notes, (note, key) => {
            return (
                <NoteCard key={key}>
                    <div id="postlist">
                        <div className="panel">
                          <div className="panel-heading">
                            <div className="text-center">
                              <div className="row">
                                <div className="col-sm-9">
                                  <Link to={`/${key}`}>
                                    <h3 className="pull-left">{note.title} <small>by {note.author}</small></h3>
                                  </Link>
                                </div>
                                <div className="col-sm-3">
                                  <h4 className="pull-right">
                                    <small><em><Moment fromNow locale="es">{note.date}</Moment></em></small>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body">
                          {renderHTML(note.body)}
                        </div>
                    </div>

                      {note.uid === this.props.user.uid && (
                          <div className="panel-footer">
                              <button className="btn btn-danger no-border" onClick={() => this.props.deleteNote(key)}>
                                  Delete
                              </button>
                              <Link to={`/${key}/edit`}>
                                <button className="btn btn-info pull-right no-border">Edit</button>
                              </Link>
                          </div>
                      )}
                </NoteCard>
            );
        }).reverse();
    }

    renderEditor() {
      return (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input
                    onChange={this.handleChange}
                    value={this.state.title}
                    type="text"
                    name="title"
                    className="form-control no-border"
                    placeholder="Title..."
                    onChange={(e) => {this.setState({title: e.target.value});}}
                    required
                />
            </div>

            <div className="form-group">
                <ReactQuill modules={App.modules} formats={App.formats} value={this.state.body}
                    onChange={this.handleChange}
                    name="body"
                    className="form-edit no-border"
                    placeholder="Write away..."
                    required
                />
            </div>

            <div className="form-group">
                <button className="btn btn-primary col-sm-12 no-border">Save</button>
            </div>
        </form>
      )
    }
    render() {
        return (
            <div className="container-fluid">
              {this.renderEditor()}
                <br />
                <br />
                <br />
              {this.renderNotes()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        notes: state.notes,
        user: state.user
    };
}

App.modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold','italic','underline','strike','blockquote'],
    [{ 'color': [] }, { 'background': [] }],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['link','image','video'],
    ['clean'],
    ['code-block']
  ]
};

App.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'color', 'background',
  'list', 'bullet',
  'indent',
  'link', 'image', 'video', 'code-block'
];

export default connect(mapStateToProps, { getNotes, saveNote, deleteNote, getUser })(App);
