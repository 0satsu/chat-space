json.array! @messages do |message|
  json.(message, :content, :image)
  json.user message.user.name
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  json.id message.id
  json.group_id message.group.id
end