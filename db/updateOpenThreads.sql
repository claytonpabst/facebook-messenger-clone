update openthreads
set mostrecentmessage = $3, timestamp = current_timestamp
where userid = $1 and correspondentid = $2