$(function(){
  function buildHTML(message){
    var html = `<div class="chat__bottom__message">
                  <div class="chat__bottom__message_info">
                    <div class="chat__bottom__message__info__user">
                      <p>${message.user}</p>
                    </div>
                    <div class="chat__bottom__message__info__date">
                      <p>${message.image}</p>
                    </div>
                  </div>
                  <div class="chat__bottom__message__content">
                    <p class="chat__bottom__message__text">
                      ${message.content}
                    </p>
                  </div>
                </div>`
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
      $('.chat__footer__box__text').val("");

    })
    .fail(function(){
      alert("エラーが発生しました")
    })
  });
});