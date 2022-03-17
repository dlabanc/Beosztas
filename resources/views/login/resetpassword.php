<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/login/resetpassword.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>rpw</title>
</head>
<body>
    <?php if(session('status')!==null) { $status=session('status'); echo $status; echo "<br>";} ?>
    <?php if(session('errors')!==null) { $error=session('errors')->first('email'); if ($error!==''){echo $error; echo "<br>";}} ?>
    <main>
    <form id="form" method="POST" action=<?php $route=route('password.update'); echo $route?>>
    <div class="logo-container">
        <h2>Chill Out Café</h2>
        <p class="kerdes">Jelszó visszaállítás</p>
       
        </div>    
    <fieldset>
            
            <input type="hidden" name="_token" value=<?php $token=csrf_token(); echo $token;?>>
            <input type="hidden" name="token2" value=<?php echo $token2;?>>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
            <label for="password">Jelszó:</label>
            <input type="password" id="password" name="password">
            <label for="password_confirm">Jelszó újra:</label>
            <input type="password" id="password_confirm" name="password_confirm"><br>
            <input type="submit" id="submit" value="Küld">
        </fieldset> 
    </form>
    </main>
</body>
</html>