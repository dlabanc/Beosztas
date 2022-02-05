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
    <link rel="stylesheet" href="css/usermenu/usermenu.css" />
    <link rel="stylesheet" href="/css/global/global.css">
    <meta name="csrf-token" content=<?php $token=csrf_token(); echo $token;?>>
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="/node_modules/jquery-ui-1.13.0/jquery-ui.min.js"></script>
    <script src="/js/global/Ajax.js"></script>
    <script src="/node_modules/darkmode-js/lib/darkmode-js.min.js"></script>
    <script src="/js/global/Oldalesemenyek.js"></script>
    <script src="/js/global/Osztalyok.js"></script>
    <script src="/js/global/profile.js"></script>
    <script src="/js/global/nemErekRa.js"></script>
    <script src="/js/user/user.js"></script>
    <title>Alkalmazott</title>
  </head>
  <div class="managerinfo">
  <div><span class="fas fa-home"></span> Chill out Cafe </div>
  <div><img src="" alt="" class="profilepic"></div>
  <div class="managerinfo-name"> Alkalmazott neve, munkakör</div>
  
  </div>
 
  <header>
    
    <nav>
     
      <div  class="navbar"> 
        
          
          <a id="profiladatok" class="fas fa-user"><span>Profil adatok</span></a>
          <a class="darkmode-user fas fa-eye"><span>Kompakt mód</span></a>
          <a  class="passchange fas fa-user-lock"><span>Jelszó módosítás</span></a>
          <a href="/login" class="logout"><div ></div>Kijelentkezés</a>
      </div>
    </nav>
   
   
      <span style="font-size: 20px; cursor: pointer" class="openbtn"
        >&#9776;</span
      >
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn">&times;</a>
        <a href="../usermenu">Kezdőlap</a>
        <a id="nemerekra">Nem érek rá</a>
        <a id="statisztika">Statisztika</a>
        <a id="faliujsag">Faliújság</a>
        <a id="beosztas">Beosztás</a>
      </div>
    
  </header>

  <body>
    <div class="container">
      <aside class="useraside">
        <div class="posts">
         
         
        </div>
      </aside>
      <article>
        <div id="Profiladatok" class="tabcontent">
          <h1>Profil adatok</h1>
          <h2>Labanc Dániel</h2>
          <img src="../pictures/doctor.jpg" alt="kép" />
          <div id="tables">
            <table id="elso"></table>
            <table id="masodik"></table>
          </div>
        </div>
        <div id="Nemerekra" class="tabcontent">
             
        
          <div class="dates">
            <div id="nemerekraMenu">
              <select name="option" id="option">
                <option disabled selected>Válassz a napok közül...</option>
                <option id="hetfo" value="hetfo">Hétfő</option>
                <option id="kedd" value="kedd">Kedd</option>
                <option id="szerda" value="szerda">Szerda</option>
                <option id="csutortok" value="csutortok">Csütörtök</option>
                <option id="pentek" value="pentek">Péntek</option>
                <option id="szombat" value="szombat">Szombat</option>
                <option id="vasarnap" value="vasarnap">Vasárnap</option>
              </select>
             
            </div>
          <p id="datum"></p>   
          <p class="aktdatum"></p>
        </div>
          <div id="napok">
            <div id="Hetfo" class="lapoz"></div>
            <div id="Kedd" class="lapoz"></div>
            <div id="Szerda" class="lapoz"></div>
            <div id="Csutortok" class="lapoz"></div>
            <div id="Pentek" class="lapoz"></div>
            <div id="Szombat" class="lapoz"></div>
            <div id="Vasarnap" class="lapoz"></div>
          </div>
          <div class="gombok"> 
            <div id="elozoNap">< Előző nap</div>
            <div id="kovetkezoNap">Következő nap ></div>
          </div>  
        </div>

        <div id="Statisztika" class="tabcontent">
          <h3>Statisztika</h3>
          
        </div>

        <div id="Faliujsag" class="tabcontent">
          <h3 id="fu">Faliújság</h3>
          <button id="newpost">Új bejegyzés</button>
          <div class="posts-grid">
          <div class="posts-container">
            
          </div>
          <fieldset>
          <legend>Új bejegyzés</legend>
          <div id="newpost-form">
            
            <label for="cim">Cim:</label>
            <input type="text" name="cim" id="newpost-cim">
            </div>
            <div class="form-grid">
            <label for="tartalom">Tartalom:</label>
            <textarea name="tartalom" id="newpost-tartalom" cols="30" rows="10"></textarea>
            <div class="buttons">
              <button class="fas fa-check"></button>
              <button class="fas fa-times"></button>
            </div>
            </div>
          </div>
        </fieldset>
        </div>
        <div id="Beosztas" class="tabcontent">
          <h3>Beosztás</h3>
          
        </div>
        </div>
        
      </article>
      <div class="password-window">
        <div class="password-window-bg">
          <h3>Jelszó módosítása</h3>
          <p class="password-notification">
            A megadott jelszavak nem egyeznek meg!
          </p>
          <input type="text" placeholder="Régi jelszó..." />
          <br />
          <input id="pass-first" type="text" placeholder="Új jelszó..." />
          <br />
          <input
            id="pass-second"
            type="password"
            placeholder="Új jelszó ismét..."
          />
          <br />
          <div class="password-buttons">
            <button class="passwordOk" disabled>Ok</button>
            <button class="passwordNo">Mégse</button>
          </div>
        </div>
      </div>
      <div class="post-info">
        
        <div class="post-img">
          <img src="" alt="" />
        </div>
        <div class="post-info-user-data">
          <div class="close--title">
          
          <h3></h3>
          <button class="closeinfo">&times;</button>
          </div>
          <p class="info"></p>
          <section>Alkalmazott neve<br />Munkakör</section>
         
        </div>
        
      </div>
      
     
  </body>
</html>
