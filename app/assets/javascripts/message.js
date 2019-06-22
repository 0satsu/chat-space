$(function(){
  function buildHTML(message){
    var html = `<div class="chat__bottom__message" data-id =${message.id}  data-group_id = ${message.group_id} >
                  <div class="chat__bottom__message_info">
                    <div class="chat__bottom__message__info__user">
                      <p>${message.user}</p>
                    </div>
                    <div class="chat__bottom__message__info__date">
                      <p>${message.created_at}</p>
                    </div>
                  </div>
                  <div class="chat__bottom__message__content">
                    <p class="chat__bottom__message__text">
                      ${message.content}
                    </p>
                  </div>
                </div>`
    html = message.image.url== null?
     $(html).append(`<div></div>`) : $(html).append(`<img class="chat__bottom__message__image" src="${message.image.url}" width="250" height="250">`)
    return html;
  };

  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $(".chat__footer__submit").removeAttr("data-disable-with");
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $('.messages').append(html);
      $('.chat__bottom').animate({ scrollTop: $('.chat__bottom')[0].scrollHeight});
      $(new_message)[0].reset();
    })
    .fail(function(){
      alert("エラーが発生しました")
    })
  });
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $(".chat__bottom__message").last().data("id");
    var last_message_group = $(".chat__bottom__message").last().data("group-id");
    var data = {id: last_message_id}
    url = `/groups/${last_message_group}/api/messages`;
    console.log(data);
  
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: data
    })
    .done(function(messages) {
       //追加するHTMLの入れ物を作る
      var insertHTML = '';
       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
        if(message.id > last_message_id && message.group_id == last_message_group){
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
        }
        $('.messages').append(insertHTML);
        $('.chat__bottom').animate({ scrollTop: $('.chat__bottom')[0].scrollHeight},'fast');
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});