select * from users
WHERE firstname ilike $1
or lastname ilike $1
LIMIT 20