class EditUser extends Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Editing: {this.props.user.name}</h4>
          <form
            class="user-form"
            method="POST"
            action={"/users/edit/"+ this.props.user.id + "?_method=PUT"}
          >
            <div class="user-attribute">
              name: <input name="name" type="text" DefaultValue="{{user.name}}" />
            </div>
            <div class="user-attribute">
              email: <input name="email" type="email" DefaultValue="{{user.email}}" />
            </div>
            <div class="user-attribute">
              password:{" "}
              <input
                name="password"
                type="password"
                DefaultValue="{{user.password}}"
              />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}
module.exports = EditUser;
