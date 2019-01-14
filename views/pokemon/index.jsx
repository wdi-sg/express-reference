var React = require("react");

class Home extends React.Component {
  render() {
    console.log(this.props.types);
    return (
      <html>
        <head />
        <body>
          <h3>Types</h3>
          {this.props.types.map(type => (
            <li key={type.id}>
              <a href={"/pokemons/types/"+type.id}>{type.pokemon_type}</a>
            </li>
          ))}
        </body>
      </html>
    );
  }
}

module.exports = Home;
