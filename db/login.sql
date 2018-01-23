select * from users
where email ilike $1 and
password = $2