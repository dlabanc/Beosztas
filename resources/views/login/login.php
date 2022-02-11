<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../node_modules/normalize.css/normalize.css" />
    <link
      rel="stylesheet"
      href="../node_modules/@fortawesome/fontawesome-free/css/all.css"
    />
    <link rel="stylesheet" href="/css/login/login.css" />
    <link rel="stylesheet" href="/css/global/global.css">
    <script src="/node_modules/darkmode-js/lib/darkmode-js.js"></script>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script src="/js/global/Oldalesemenyek.js"></script>
    
    <title>Bejelentkezés</title>
  </head>
  <button class="btn"></button>
  <body class="login">
    <div class="container">
      <div>
        <h3 class="label">Login</h3>
      </div>
      <div class="form">
      <?php if(session('errors')!==null) { $error=session('errors')->first('loginlimit'); if ($error!==''){echo $error; echo "<br>";}} ?>
        <form method="POST" action=<?php $route=route('hitelesites'); echo $route?>>
          <input type="hidden" name="_token" value=<?php $token=csrf_token(); echo $token;?>>
          <div class="inputs">
            <div class="field">
              <li class="icons fas fa-user"></li>
              <input
                type="text"
                id="user_login"
                name="user_login"
                placeholder="Felhasználónév..."
              />
            </div>
            <div class="field">
              <li class="icons fas fa-lock"></li>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Jelszó..."
              />
            </div>
            
          </div>
          <div class="rememberme">
            
            <input type="checkbox" name="remember" id="remember" value="" />
            <label for="remember">Felhasználónév megjegyzése</label>
          </div>
          <div class="input_buttons">
            <input
              type="submit"
              id="login"
              name="login"
              value="Bejelentkezés"
            />
            <a href="#" class="forgotpass">Elfelejtetted a jelszavadat?</a>
          </div>
        </form>
      </div>
      <div>
        <footer class="label">Vizsgamunka © 2021</footer>
      </div>
    </div>

  </body>

</html>
