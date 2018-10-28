import React, { Component } from 'react';

// step 1
// const withNewClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className = {className} >
//             <WrappedComponent {...props} />
//         </div>
//     )
// }

//step 2
const withNewClass = (WrappedComponent, className) => {
    const WithNewClass = class extends Component {
        render() {
            return (
                <div className = {className} >
                    <WrappedComponent ref = {this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }
    return React.forwardRef((props, ref) => {
        return <WithNewClass forwardedRef = {ref} {...props} />
    })
}

export default withNewClass;