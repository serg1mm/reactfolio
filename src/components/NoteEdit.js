import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editNote } from '../actions/notesAction';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class NoteEdit extends Component {
    constructor(props) {
        super(props);
        // state
        this.state = {
            title: this.props.note.title,
            body: this.props.note.body
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handle change
    handleChange(e) {
      this.setState({body: e});
    }

    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        const note = {
            title: this.state.title,
            body: this.state.body,
            uid: this.props.uid
        };
        this.props.editNote(this.props.match.params.id, note);
        this.setState({
            title: '',
            body: ''
        });
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
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
                              <ReactQuill modules={NoteEdit.modules} formats={NoteEdit.formats} value={this.state.body}
                                  onChange={this.handleChange}
                                  name="body"
                                  className="form no-border"
                                  placeholder="Write away..."
                                  required
                              />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary no-border">Update</button>
                            </div>
                            <br />
                            <br />
                            <Link to="/"> &#171; Back</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

NoteEdit.modules = {
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

NoteEdit.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'color', 'background',
  'list', 'bullet',
  'indent',
  'link', 'image', 'video', 'code-block'
];

function mapStateToProps(state, ownProps) {
    return {
        note: state.notes[ownProps.match.params.id],
        uid: state.user.uid
    };
}

export default connect(mapStateToProps, { editNote })(NoteEdit);
