// YOUR CODE HERE:



var app = {rooms: {}, friends: {}};

// 'rooms': {'lobby': true}

//for each room add room to app.rooms

//pull room data from server and populate room object

app.init = function() {};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


app.fetch = function(request) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: { order: '-createdAt', limit: 100 },
    contentType: 'application/json',
    success: function (data) {
      app['data'] = data;

      console.log('chatterbox: Message retrieved');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message', data);
    }
  });

};

app.clearMessages = function() {
  $('#chats').html('');
};


app.renderMessage = function(message) {

  var validText = JSON.stringify(message.text);
  if (!validText) { validText = 'undefined'; }
  if (validText[0] === '"') { validText = validText.substring(1, validText.length - 1); }


  $('#chats').append('<div type="text"></div>');
  $('#chats').children().last().text('message: ' + validText);
  $('#chats').children().last().prepend('<span class="roomText">room: ' + message.roomname + '</span><br>');
  var room = message.roomname || 'undefined';
  var $msg = $('#chats').children().last();
  var $username = $('<span style="float: right" class="userInDom"></span>');
  $username.text(message.username);
  $username.addClass(message.username);
  $username.data('name', message.username);
  $msg.append($username);
  $msg.data('room', room);


};





app.renderRoom = function(room) {

  console.log(room);


  var filteredMessages = app.data.results.filter(function(element) {
    return (element.roomname === room);
  });
  console.log(filteredMessages);
  app.clearMessages();

  filteredMessages.forEach(app.renderMessage);

  $('.userInDom').on('click', function() {
    var $friend = $(this).data('name');
    //console.log('$friend', )
    //console.log($(this).data('name'));
    app.friends[$friend] = true;
    $('.' + friend ).css('color', 'red');
    $friend.css('color', 'blue');
    var $els = $('.userInDom').find("[data-name='" + $friend + "']");
    $els.css("color", "green");

// $( "#mydiv" ).css( "color", "green" )

// $('ul').find(el+[data-slide=+current+]);
// $('a[data-filter-value="' + attribu + '"]').css("background", "#ddd");
  // $('*[data-customerID="22"]');

// $("p").css("color", "red");

  });

};

app.fetch();



var populate = function() {


  app.data.results.forEach(function(val, key, col) {
    app.rooms[val.roomname] = val.roomname;
    app.renderMessage(val);
  });


  for (var i in app.rooms) {
    var $option = $('<option></option>');

    $option.text(i);
    $option.attr('value', i);

    $('select').append($option);
  }

  $('#roomsmenu').on('change', function(event) {

    var room = $(this).val();

    app.renderRoom(room);


  });

  $('.userInDom').on('click', function() {
    console.log($(this).data('name'));
  });



};

var waitAndPopulate = function() {
  setTimeout(function() {
    app.clearMessages();
    populate();
  }, 4000);

};

waitAndPopulate();

$(document).ready(function() {
  $('#submitmsg').on('click', function() {
    var message = {username: name, 
      text: $('#message').val(),
      roomname: $('#room').val()
    };
    app.send(message);
    app.fetch();
    waitAndPopulate();
  });
});