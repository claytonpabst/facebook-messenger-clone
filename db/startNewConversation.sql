insert into openthreads
(userid, correspondentid, correspondentimageurl, correspondentfirstname, correspondentlastname, mostrecentmessage, timestamp)
VALUES ($1, $2, $3, $4, $5, null, current_timestamp)
