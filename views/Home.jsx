var React = require("react");

// example of dangerously set inner html

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                <div dangerouslySetInnerHTML={{__html: pokemon.name}} />
                <p>name: {pokemon.name}</p>
                <p>height: {pokemon.height}</p>
              </li>
            ))}
          </ul>

          <hr/>

          <form
            className="pokemon-form"
            method="POST"
            action={"/find"}
          >
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={this.props.pokemon.name}
              />
            </div>
            <input name="submit" type="submit" />
          </form>

        </body>
      </html>
    );
  }
}

module.exports = Home;
