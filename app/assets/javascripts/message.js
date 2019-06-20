$(function(){
  function buildHTML(message){
    var html = `<div class="chat__bottom__message">
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
});