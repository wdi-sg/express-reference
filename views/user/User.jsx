var React = require("react");

class User extends React.Component {
  render() {
    return (
      <html>
      <head/>
      <body>
        <ul class="user-list">
          <li class="user-attribute">
            id: {this.props.user.id}
          </li>
          <li class="user-attribute">
            name: {this.props.user.name}
          </li>
          <li class="user-attribute">
            email: {this.props.user.email}
          </li>
        </ul>
      </body>
      </html>        
    );
  }
}

module.exports = User;
