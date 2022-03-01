<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>fpw</title>
</head>
<body>
    <?php if(session('status')!==null) { $status=session('status'); echo $status; echo "<br>";} ?>
    <?php if(session('errors')!==null) { $error=session('errors')->first('email'); if ($error!==''){echo $error; echo "<br>";}} ?>
    <main>
    <form id="form" method="POST" action=<?php $route=route('password.email'); echo $route?>>
        <fieldset>
            <legend>Elfelejtett jelszó:</legend>
            <input type="hidden" name="_token" value=<?php $token=csrf_token(); echo $token;?>>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br>
            <input type="submit" id="submit" value="Küld">
        </fieldset> 
    </form>
    </main>
</body>
</html>