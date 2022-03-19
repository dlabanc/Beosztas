<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/login/resetpassword.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/js/global/Ajax.js"></script>
    <script src="/js/global/Oldalesemenyek.js"></script>
    <meta name="csrf-token" content=<?php $token=csrf_token(); echo $token;?>>
    <title>Jelszó visszaállítás</title>
</head>
<body>
    <main>
    <form id="form" method="POST">
    <div class="logo-container">
        <h2>Chill Out Café</h2>
        <p class="kerdes">Jelszó visszaállítás</p>
        <p id="reseterror"></p>
        </div>    
    <fieldset>
            
            <input type="hidden" name="_token" value=<?php $token=csrf_token(); echo $token;?>>
            <input type="hidden" id="token2" name="token2" value=<?php echo $token2;?>>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
            <label for="password">Jelszó:</label>
            <input type="password" id="password" name="password">
            <label for="password_confirm">Jelszó újra:</label>
            <input type="password" id="password_confirm" name="password_confirm"><br>
            <input type="submit" id="rsubmit" value="Küld">
        </fieldset> 
    </form>
    </main>
</body>
</html>