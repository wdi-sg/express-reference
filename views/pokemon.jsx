var React = require('react');

class Pokemon extends React.Component {
  render() {

    return (

      <html>
        <head></head>
        <body>
          <div>
            <ul class="pokemon-list">
              <li class="pokemon-attribute">
                id: {this.props.pokemon.id}
              </li>
              <li class="pokemon-attribute">
                num: {this.props.pokemon.num}
              </li>
              <li class="pokemon-attribute">
                name: {this.props.pokemon.name}
              </li>
              <li class="pokemon-attribute">
                img: {this.props.pokemon.img}
              </li>
              <li class="pokemon-attribute">
                height: {this.props.pokemon.height}
              </li>
              <li class="pokemon-attribute">
                weight: {this.props.pokemon.weight}
              </li>
              <li class="pokemon-attribute">
                candy: {this.props.pokemon.candy}
              </li>
              <li class="pokemon-attribute">
                candy_count: {this.props.pokemon.candy_count}
              </li>
              <li class="pokemon-attribute">
                egg: {this.props.pokemon.egg}
              </li>
              <li class="pokemon-attribute">
                avg_spawns: {this.props.pokemon.avg_spawns}
              </li>
              <li class="pokemon-attribute">
                spawn_time: {this.props.pokemon.spawn_time}
              </li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
