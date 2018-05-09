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
