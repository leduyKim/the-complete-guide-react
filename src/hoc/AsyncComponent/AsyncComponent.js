import React, { Component } from 'react';

const asyncComponet = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }
        componentDidMount() {
            importComponent()
                .then(cpn => {
                    this.setState({component: cpn.default})
                })
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponet;