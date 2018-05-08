var React = require("react");

class Home extends React.Component {
  render() {
    const loginOption = this.props.logged_in ? (
      <form action="/users/logout" method="POST">
        <input type="submit" value="log out" />
      </form>
    ) : (
      <a href="/users/login">login</a>
    );

    return (
      <html>
        <head />
        <body>
          <h1>Hi, you've been here: {this.props.visits} times!</h1>
          {loginOption}
        </body>
      </html>
    );
  }
}

module.exports = Home;
