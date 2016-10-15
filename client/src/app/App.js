import React              from 'react';
import _                  from 'lodash';
import classNames         from 'classnames';
import { connect }        from 'react-redux'
import { browserHistory } from 'react-router';

import ModalContainer from 'app-components/modal-container';

class App extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };

    componentWillMount() {
        this.redirectIfPathIsNotValid(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.redirectIfPathIsNotValid(nextProps);
    }

    render() {
        return (
          <div className={this.getClass()}>
              <div className="application__content">
                {React.cloneElement(this.props.children, {})}
              </div>
              <ModalContainer />
          </div>
        );
    }

    getClass() {
        let classes = {
            'application': true,
            'application_modal-opened': (this.props.modal.opened)
        };

        return classNames(classes);
    }

    redirectIfPathIsNotValid(props) {
        const validations = {
            languageChanged: props.config.language !== this.props.config.language,
            loggedIn: !_.includes(props.location.pathname, '/dashboard') && props.session.logged,
            loggedOut: _.includes(props.location.pathname, '/dashboard') && !props.session.logged,
            loggedInStaff: !_.includes(props.location.pathname, '/admin/panel') && props.session.logged && props.session.staff,
            loggedOutStaff: _.includes(props.location.pathname, '/admin/panel') && !props.session.logged
        };

        if (validations.languageChanged) {
            browserHistory.push(props.location.pathname);
        }

        if (validations.loggedOut) {
            browserHistory.push('/');
        }

        if (validations.loggedOutStaff) {
            browserHistory.push('/admin');
        }

        if (validations.loggedIn && !props.session.staff) {
            browserHistory.push('/dashboard');
        } else if(validations.loggedInStaff) {
            browserHistory.push('/admin/panel');
        }
    }
}

export default connect((store) => {
    return {
        config: store.config,
        modal: store.modal,
        session: store.session,
        routing: store.routing
    };
})(App);