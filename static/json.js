$(function() {
    setInterval(function() {
        init();
    }, 3000);
});

function init() {
    var enra = getEnraResponse();
    var sendData = JSON.stringify({"enra":enra});
    $.ajax({
      type: 'POST',
      url: '/fetchPos',
      data: sendData,
      contentType: 'application/json',
      success:function(data) {
        var result = JSON.parse(data.ResultSet).result;
        $("#hello").text(result);
      }
    });
    return false;
}

function getEnraResponse() {
    var rand = Math.random() * (22 - 18) + 18;
    return rand;
}
