<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/global/global.css">
    <link rel="stylesheet" href="/css/admin/admin.css">
    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css">
    <link rel="stylesheet" href="/node_modules/@fortawesome/fontawesome-free/css/all.css">
    <meta name="csrf-token" content=<?php $token=csrf_token(); echo $token;?>>
    
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <link rel="stylesheet" href="/node_modules/jquery-ui-1.13.0/jquery-ui.min.css">
    <script src="/node_modules/jquery-ui-1.13.0/jquery-ui.js"></script>
    <script src="/js/global/Ajax.js"></script>
    <script src="/node_modules/darkmode-js/lib/darkmode-js.min.js"></script>
    <script src="/js/global/Oldalesemenyek.js"></script>
    <script src="/js/global/Osztalyok.js"></script>
    <script src="/js/admin/admin.js"></script>
    <title>Admin</title>
  
</head>

<body>
    <header class="adminheader">
        <div class="stat1 box" >
            <div class="allusers"> 
                <div class="fas fa-users"></div>
            <div class="desc"> Összes Alkalmazott</div>
            
        </div>
            <div class="stat1value">50</div>
        </div>
        <div class="stat2 box" >
            <div class="allusers"> 
                <div class="fas fa-child"></div>
            <div class="desc"> Legújabb Alkalmazott</div>
            
        </div>
            <div class="stat2value">Labanc Dániel</div>
        </div>
        <div class="stat3 box">
            <div class="allusers"> 
                <div class="fas fa-bullhorn"></div>
            <div class="desc"> Mai bejegyzések száma</div>
            
        </div>
            <div class="stat3value">12</div>
        </div>
        <div class="stat4 box">
            <div class="allusers"> 
                <div class="fas fa-sign-in-alt"></div>
            <div class="desc">Összes bejelentkezés</div>
            
        </div>
            <div class="stat4value">32</div>
        </div>
      
    </header>
    <article>
        <div id="Alkalmazottak" class="tabcontent">
            <h3>Alkalmazottak</h3>
            
            <table class="Alkalmazottak">
               
                <thead class="fejlec">
                   
                </thead>
            </table>
            </div>
            <div id="Munkakorok" class="tabcontent">
            <h3>Munkakörök Admin</h3>
            <table class="Munkakorok">
               
                <thead class="fejlec">
                   
                </thead>
            </table>
            </div>
            <div id="Beadatok" class="tabcontent">
                <h3>Bejelentkezési adatok Admin</h3>
                <table class="Bejelentkezési-adatok">
               
                    <thead class="fejlec">
                       
                    </thead>
                </table>
            </div>
            <div id="Faliujsag" class="tabcontent">
                <h3>Faliujsag Admin</h3>
                <table class="Faliujsag">
                    <thead class="fejlec">
                   
                    </thead>
                    
                </table>
            </div>
            <div id="Muszaktipus" class="tabcontent">
                <h3>Muszaktipus Admin</h3>
                <table class="Muszaktipus">
                    <thead class="fejlec">
                   
                    </thead>
                    
                </table>
            </div>
            <div id="Napimunkaeroigeny" class="tabcontent">
                <h3>Napimunkaerőigény Admin</h3>
                <table class="Napimunkaeroigeny">
                    <thead class="fejlec">
                   
                    </thead>
                    
                </table>
            </div>
            <div id="Napok" class="tabcontent">
                <h3>Napok Admin</h3>
                <table class="Napok">
                    <thead class="fejlec">
                   
                    </thead>
                    
                </table>
            </div>
            <div id="Beosztas" class="tabcontent">
                <h3>Beosztás Admin</h3>
                <table class="Beosztas">
                    <thead class="fejlec">
                   
                    </thead>
                    
                </table>
            </div>
            <div id="Nemdolgozna" class="tabcontent">
                <h3>Nemdolgozna Admin</h3>
                <table class="Nemdolgozna">
                    <thead class="fejlec">
                   
                    </thead>
                    
                </table>
            </div>
            <div id="Szabadsag" class="tabcontent">
                <h3>Szabadság Admin</h3>
                <table class="Szabadsag">
                    <thead class="fejlec">
                   
                    </thead>
                    
                </table>
            </div>
    </article>
    <aside>
        <nav>
            <ul>
                <div class="admininfo">
                    <h4>Chill out Cafe</h4>
                    <div class="fas fa-user"></div> Admin
                    </div>
                </div>
           
                <li id="alkalmazottak">Alkalmazott</li>
                <li id="munkakorok">Munkakör</li>
                <li id="beadatok">Bejelentkezési adatok</li>
                <li id="faliujsag">Faliújság</li>
                <li id="muszaktipus">Műszaktípus</li>
                <li id="napimunkaeroigeny">Napimunkaerőigény</li>
                <li id="napok">Napok</li>
                <li id="beosztas">Beosztás</li>
                <li id="nemdolgozna">Nem dolgozna</li>
                <li id="szabadsag">Szabadság</li>
                <li class="btn">Sötét mód</li>
                <li class="logout"><a href="../login/login.html"><div class="fas fa-sign-out-alt">
                </div><span> Kijelentkezés</span>
                </a>
                </li>
                
            </ul>
        </nav>
        </aside>
</body>
</html>