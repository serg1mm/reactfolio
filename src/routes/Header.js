import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, logout } from '../actions/userAction';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>

                        <Link className="navbar-brand" to="/">
                            Reactfolio
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            {this.props.user === null ? (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            ) : (
                                <li><p style={{clear: "both", float: "left", margin: "0 0 0 0", padding:"2vh 0 0 0"}}>Hello again, {this.props.user.displayName}!</p><img
                                  src={this.props.user.photoURL}
                                  alt="User avatar" height="100px"
                                  className="img img-circle"
                                  style={{ padding: '10px', height: '50px', width: "50px", float: "right" }}
                              /><Link to="/logout" onClick={() => this.props.logout()}></Link></li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getUser, logout })(Header);
