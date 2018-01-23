insert into conversations (conversationid, correspondent, fromcorrespondent, message, timestamp)
values ($1, $2, $3, $4, current_timestamp)