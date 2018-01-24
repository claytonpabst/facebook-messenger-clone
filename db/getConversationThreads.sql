select * from openthreads
where userid = $1
order by timestamp desc
limit 20