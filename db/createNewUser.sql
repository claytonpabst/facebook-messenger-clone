INSERT INTO Users (Email, FirstName, LastName, salt, password, passwordhint, imageUrl, mostrecentcorrespondentid)
values ($3, $1, $2, 8374662, $4, null, 'http://gceus.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png', null) 
RETURNING *