select * from conversations
where conversationid = $1
order by timestamp desc
limit 20