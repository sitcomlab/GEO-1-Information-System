To install this you need to:

1. run the admin/sql/schema.sql
2. add data to the database, e.g. by running the admin/sql/data-*.sql
3. change the path to the admin/.htpasswd file in admin/.htaccess
4. add a user with password to the admin/.htpasswd file (password must be encrypted, see the corresponding manual)
5. Change the .htaccess file to fit your access restrictions
6. change the database credentials in admin/php/config.inc.php