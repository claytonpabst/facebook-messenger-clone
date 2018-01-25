select * from openthreads
where userid = $1 and mostrecentmessage is not null
order by timestamp desc
limit 20