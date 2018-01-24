select * from conversations
where conversationid = $1
order by timestamp asc
limit 20