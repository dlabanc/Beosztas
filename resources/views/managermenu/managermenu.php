<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content=<?php $token = csrf_token();
                                    echo $token; ?>>
    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css" />
    <link rel="stylesheet" href="/node_modules/@fortawesome/fontawesome-free/css/all.css" />

    <link rel="stylesheet" href="/css/managermenu/managermenu.css" />
    <link rel="stylesheet" href="/css/global/global.css">
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <link rel="stylesheet" href="/node_modules/jquery-ui-1.13.0/jquery-ui.min.css">
    <script src="/node_modules/jquery-ui-1.13.0/jquery-ui.js"></script>

    <script src="/node_modules/darkmode-js/lib/darkmode-js.min.js"></script>
    <script src="/js/global/Oldalesemenyek.js"></script>
    <script src="/js/global/Osztalyok.js"></script>
    <script src="/js/global/Ajax.js"></script>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="/js/managermenu/manager.js"></script>
    <title>Üzletvezető</title>
</head>
<div>
    <div class="managerinfo">
        <div class="managerinfo-leftgrid">
            <span class="profile-name "></span>


        </div>

        <div class="managerinfo-midgrid">
           


        </div>

        <div class="managerinfo-rightgrid">


            <div class="openbtn"><img src="" alt="" class="profilepic"><span class="arrow">&#9660;</span></div>

        </div>
        
    </div>
    
</div>
<aside class="useraside">
            <header>
                <nav>

                    <div class="navbar">

                        <a class="chilloutcafe">
                            <div class="fas fa-home"></div><span>Chill Out Cafe</span>
                        </a>
                        <a id="profiladatok" class="profiladatok">
                            <div class="fas fa-user"></div><span>Profil adatok</span>
                        </a>
                        <a class="darkmode-user">
                            <div class="fas fa-eye"></div><span>Kompakt mód</span>
                        </a>
                        <a class="passchange">
                            <div class="fas fa-user-lock"></div><span>Jelszó módosítás</span>
                        </a>

                    </div>
                </nav>
            </header>

</aside>



<div id="mySidenav" class="sidenav">

    <a href="javascript:void(0)" class="closebtn">&times;</a>
    <a href="../managermenu" class="links links2">
        <div>Kezdőlap</div><span class="fas fa-home"></span>
    </a>
    <a href="../managermenu">Kezdőlap</a>
    <a id="munkakorok">Munkakörök</a>
    <a id="alkalmazottak">Alkalmazottak</a>
    <button class="links links2" id="muszakmenu">
        <div>Műszakok</div><span class="fas fa-users"><span class="arrow">&#9660;</span></span>
    </button>
    <div class="open1">
        <a id="muszaktipush">Műszak típus hozzáadása</a>
        <a id="muszaktipusm">Műszak eloszlás módosítása</a>
    </div>
    <button class="links links2" id="beosztasmenu">
        <div>Beosztás</div><span class="fas fa-calendar"><span class="arrow">&#9660;</span></span>
    </button>
    <div class="open2">
        <a id="napimunka">Napi munkaerőigény</a>
        <a id="beosztasmeg">Beosztás megtekintése</a>
    </div>
    <button class="links links2" id="egyebmenu">
        <div>Egyéb</div><span class="fas fa-cogs"><span class="arrow">&#9660;</span></span>
    </button>
    <div class="open3">
        <a id="statisztika">Statisztika</a>
        <a id="faliujsag">Faliújság</a>
    </div>
    <a href="/logout" class="logout">
        <div class="logout-text">Kijelentkezés</div><span class="fas fa-sign-out-alt"></span>
    </a>
</div>


</div>
</div>


<body>

    <div class="container">


        <article>
            <div id="Profiladatok" >
                <div class="profile-head">
                    <div class="profile-infos">
                        <img src="" alt="kép" />
                    </div>
                    <div class="name-location">
                        <div class="profile-nev">Labanc Dániel</div>
                        <div class="profile-munkakor">Munkakör</div>
                    </div>
                    <div>
                        <ul>

                            <li><span class="far fa-map"></span><span class="location-address">Lakhely</span>
                            </li>
                            <li><span class="fas fa-phone"></span><span class="location-phone">Telefon</span>
                            </li>
                            <li><span class="far fa-envelope"></span><span class="location-email">Email</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="tables">
                    <div class="profile-title">
                        <h3>Profil adatok</h3><span class="fas fa-user"></span>
                    </div>
                    <table id="elso"></table>

                </div>
            </div>

            <div id="Muszaktipush" >
          

                <div class="muszaktipush-container">

                </div>
            </div>

            <div id="Muszaktipusn" >


            </div>

            <div id="Muszaktipusm" >
            
                <div class="muszaktipusm-container">

                </div>
            </div>

            <div id="Munkakorok" >
              
                
                <div class="munkakor-container">
                    
                </div>
            </div>
            <div id="Statisztika">




                <div id="Man-statisztika-elem">



                </div>
            </div>
            <div id="Alkalmazottak" class="alkalmazottak">
                <table id="AlkalmazottakTabla">
                    <tr>
                        <th>Név</th>
                        <th>Beosztás</th>
                        <th>Lakcím</th>
                        <th>Elérhetőség</th>
                        <th>E-mail</th>
                    </tr>
                    <ul class="dropdown-content tablaDropdown">

                        <li>
                            <div href="" class="fas fa-user alkalmazott-nev"><span>Név</span>
                                <div class="fas fa-times"></div>
                            </div>
                        </li>
                        <li><a class=" tablaAl" href="#"><span>Gyors módosítás</span></a></li>
                        <li><a id="AlkModosit" class=" tablaAl" href="#"><span>Profil megtekintése</span></a></li>
                    </ul>
                </table>
            </div>

            <div id="ManFaliujsag" >
                
                <button id="newpost" >Új bejegyzés</button>
                <fieldset>
                       
                        <div id="newpost-form">
                            <div class="form-grid">
                           
                                <input type="text" name="cim" id="newpost-cim" placeholder="Cím..">
                            </div>
                            <div class="form-grid">
                             
                                <textarea name="tartalom" id="newpost-tartalom" cols="30" rows="10" placeholder="Tartalom..."></textarea>
                                
                            </div>
                        </div>
                        <div class="buttons">
                                    <button class="fas fa-check"></button>
                                    <button class="fas fa-times"></button>
                                </div>
                </fieldset>
                <table class="faliujsag-container">

            </table>
            </div>
            <div id="Napimunka" >
                <h3>Napimunka</h3>
            </div>
            <div id="Ujbeosztas" >
               
            </div>
            <div id="Beosztasmod" >
                <h3>Beosztás módosítása</h3>
                <p></p>
            </div>
            <div id="Beosztasmeg" >
                <h3>Beosztás megtekintése</h3>
                <p></p>
            </div>
        </article>
        <div class="password-window">
            <div class="password-window-bg">
                <h3>Jelszó módosítása</h3>
                <p class="password-notification">A megadott jelszavak nem egyeznek meg!</p>
                <input type="text" placeholder="Régi jelszó...">
                <br>
                <input id="pass-first" type="text" placeholder="Új jelszó...">
                <br>
                <input id="pass-second" type="password" placeholder="Új jelszó ismét...">
                <br>
                <div class="password-buttons">
                    <button class="passwordOk" disabled>Ok</button>
                    <button class="passwordNo">Mégse</button>
                </div>
            </div>
        </div>
    </div>


</body>

</html>