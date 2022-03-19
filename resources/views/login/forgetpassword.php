<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="/css/login/forgetpassword.css">
    <script src="/js/global/Ajax.js"></script>
    <script src="/js/global/Oldalesemenyek.js"></script>
    <meta name="csrf-token" content=<?php $token=csrf_token(); echo $token;?>>
    <title>Elfelejtett jelszó</title>
</head>
<body>
    <main>
    <form id="form" method="POST">
        <div class="logo-container">
        <h2>Chill Out Café</h2>
        <p class="kerdes">Elfelejtette a jelszavát?</p>
        <p>Adja meg a regisztrációkor használt e-mail címét és elküldjük a jelszó visszaállításához szükséges utasításokat.</p>
        <p>Biztonsági okokból NEM tároljuk jelszavát. Biztos lehet benne, hogy soha nem küldjük el jelszavát e-mailben!</p>
        <p id="emailstatus"></p>
        </div>
        <fieldset>
            <input type="hidden" name="_token" value=<?php $token=csrf_token(); echo $token;?>>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br>
            <button id="esubmit">Küld</button>
        </fieldset> 
    </form>
    </main>
</body>
</html>