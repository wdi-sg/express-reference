<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pokemon</title>
</head>
<body>
  <form class="user-form" method="POST" action="/users/new">

    <div class="user-attribute">
      name<input name="name" type="text"/>
    </div>
    <div class="user-attribute">
      password:<input name="password" type="text"/>
    </div>
    <input name="submit" type="submit"/>
  </form>
</body>
</html>
