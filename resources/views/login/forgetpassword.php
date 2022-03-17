<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="/css/login/forgetpassword.css">
    <title>fpw</title>
</head>
<body>
    <?php if(session('status')!==null) { $status=session('status'); echo $status; echo "<br>";} ?>
    <?php if(session('errors')!==null) { $error=session('errors')->first('email'); if ($error!==''){echo $error; echo "<br>";}} ?>
    <main>
    <form id="form" method="POST" action=<?php $route=route('password.email'); echo $route?>>
        <div class="logo-container">
        <h2>Chill Out Café</h2>
        <p class="kerdes">Elfelejtette a jelszavad?</p>
        <p>Adja meg a regisztrációkor használt e-mail címét és elküldjük a jelszó visszaállításához szükséges utasításokat.</p>
        <p>Biztonsági okokból NEM tároljuk jelszavát. Biztos lehet benne, hogy soha nem küldjük el jelszavát e-mailben!</p>
        </div>
        <fieldset>
            <input type="hidden" name="_token" value=<?php $token=csrf_token(); echo $token;?>>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br>
            <input type="submit" id="submit" value="Küld">
        </fieldset> 
    </form>
    </main>
</body>
</html>