## Alapfeltételek:
### PHP + Adatbázis (XAMPP csomag tartalmazza, DB: MySQL)

### composer - php-s külső függőségek menedzseléséhez szükséges kis program. 
Telepítés: https://getcomposer.org/download/
A composer parancs minden mappában elérhető parancs lesz
Futtatásakor mindig az aktuális parancssori könyvtárban fog dolgozni. composer install parancs esetén egy composer.json fájlt fog keresni.

### Adatbázis létrehozása MySQL-ben:
`CREATE DATABASE beosztas;`

### Projekt klónozása:
`git clone https://github.com/jooedvard/Beosztas.git`

## Projekt futtatása Visual Studio Code-al:
1. Másoljuk le a **.env.example** fájlt és nevezzük át **.env**-re
    
2. Indítsunk egy új terminált és futtassuk a következő parancsot (fontos, hogy a "Beosztas" gyökérmappában futtassuk): `composer install`

3. Adatbázis migrálása: `php artisan migrate`

4. Szerver elindítása: `php artisan serve`

5. Böngészőben: `http://localhost:8000`