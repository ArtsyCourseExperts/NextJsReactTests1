/*



https://reactjs.org/docs/components-and-props.html

This is a class component
*/


import React from 'react';


class Welcome extends React.Component {
    render() {
      return <h1>Hello from component prop2 with param {this.props.name}</h1>;
    }
  }


export default Welcome;