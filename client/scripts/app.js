// YOUR CODE HERE:

var app = {'rooms': {'lobby': true}};

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

// $.get( "ajax/test.html", function( data ) {
//   $( ".result" ).html( data );
//   alert( "Load was performed." );
// });

app.fetch = function(request) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: JSON.stringify(this.url),
    contentType: 'application/json',
    success: function (data) {
      //console.log(data);
      app['data'] = data;
      console.log('chatterbox: Message retreived');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retreive message', data);
    }
  });

};

app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function(message) {
  var validText = '';

  $('#chats').append('<div type="text">' + JSON.stringify(message.text) + '</div>');
};

app.renderRoom = function(room) {
  // console.log(room);
  debugger;
  $('#roomSelect').html('<div>' + room + '</div>');
};

app.fetch();


setTimeout(function() {

  app.data.results.forEach(function(val, key, col) {
    //console.log(val.text);
    console.log('rooooooooom:', val.roomname);
    app.rooms[val.roomname] = val.roomname;
    //app.rooms[val.roomname] = true;
    app.renderMessage(val);
  });

}, 4000);

// app.data.results.forEach(function(val, key, col) {

//   setTimeout(function() {
//     app.renderMessage(val);
//   }, 3000);

// });



// app.data.results.forEach(function(val, key, col) {
//   app.renderMessage(app.data.results[key]);
// });







