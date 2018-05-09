var React = require("react");

class Home extends React.Component {
  render() {
    const loginOption = this.props.isAuthenticated ? (
      <form action="/users/logout" method="POST">
        <input type="submit" value={"log out, " + this.props.user.name} />
      </form>
    ) : (
      <div>
      <a href="/users/login">login</a>
      <p></p>
      <a href="/users/new">signup</a>
      </div>
    );

    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          {loginOption}
          <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
