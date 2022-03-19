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
    <meta name="csrf-token" content=<?php $token=csrf_token(); echo $token;?>>
    <script src="/node_modules/darkmode-js/lib/darkmode-js.js"></script>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script src="/js/global/Ajax.js"></script>
    <script src="/js/global/Oldalesemenyek.js"></script>
    
    <title>Bejelentkezés</title>
  </head>
  
  <body class="login">
    
    <div class="container">
    <div class="uveg"> 
      <div>
        <div class="icon"></div>
        <h3 class="label">Login</h3>
      </div>
      <div class="form">
        <p id="loginerror"></p>
        <form method="POST">
          <input type="hidden" name="_token" value=<?php $token=csrf_token(); echo $token;?>>
          <div class="inputs">
            <div class="field">
            <span class="fas fa-user"></span>
              <input
                type="text"
                id="user_login"
                name="user_login"
                placeholder="Felhasználónév..."
                
              />
              
            </div>
            <div class="field">
            <span class="fas fa-lock"></span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Jelszó..."
              />
            </div>
            
          </div>
         
          <div class="input_buttons">
            <button             
              id="login"
            >Bejelentkezés</button>
            <a href="/elfelejtett-jelszo" class="forgotpass">Elfelejtetted a jelszavadat?</a>
          </div>
        </form>
      </div>
      <div>
        <footer class="label">Vizsgamunka © 2021</footer>
      </div>
    </div>
    </div>

  </body>

</html>
