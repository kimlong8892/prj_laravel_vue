# prj_laravel_vue

docker exec -it --user root laravel_web_server /bin/bash<br>
docker exec -it --user root vue_server /bin/bash<br>
docker exec -it --user root nodejs_web_server /bin/bash<br>
npm run serve -- --port 5501<br>


domain/api/user/register<br>
    + name (required)<br>
    + email (required)<br>
    + password (required)<br><br>

domain/api/user/login<br>
    + email (required)<br>
    + password (required)<br><br>

domain/api/admin/login<br>
    + email (required)<br>
    + password (required)<br>

