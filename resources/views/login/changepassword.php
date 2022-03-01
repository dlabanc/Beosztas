<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change Password</title>
</head>
<body>

<form id="form" method="POST" action=<?php $route=route('password.change'); echo $route?>>
                    <fieldset>
                    <legend>Jelszó Módosítás:</legend>
                    <input type="hidden" name="_token" value=<?php $token=csrf_token(); echo $token;?>>
                    <label for="oldpwd">Régi jelszó:</label><br>                   
                    <input type="password" id="oldpwd" name="oldpwd"><br>
                    <?php if(session('errors')!==null) { $error=session('errors')->first('oldpwd'); if ($error!==''){echo $error; echo "<br>";}} ?>
                    <label for="newpwd">Új jelszó:</label><br>
                    <input type="password" id="newpwd" name="newpwd"><br>
                    <?php if(session('errors')!==null) { $error=session('errors')->first('newpwd'); if ($error!==''){echo $error; echo "<br>";}} ?>
                    <label for="confirmpwd">Jelszó megerősítése:</label><br>
                    <input type="password" id="confirmpwd" name="confirmpwd"><br>
                    <?php if(session('errors')!==null) { $error=session('errors')->first('currentpwd'); if ($error!==''){echo $error; echo "<br>";}} ?>
                    <input type="submit" id="submit" value="OK">
                </fieldset> 
                </form>
</body>
</html>