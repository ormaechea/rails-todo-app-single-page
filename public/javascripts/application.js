



var Lists = function() {
  this.pageContainer = $("#page-container");
  this.backButton = $('<a href="" class="back">all lists</a>')
}

Lists.prototype.request = function(url, success) {
  var listsObject = this;

  $.ajax({
    url: url
  }).done(function(response) { success(listsObject, response) })
}

Lists.prototype.listAll = function() {
  this.request("http://localhost:3000/lists", function(listsObject, response) {
    // listsObject.pageContainer.html("");
    listsObject.pageContainer.append("<form class = 'add_list_button'><input type='text' name = 'name'><br><input type='submit' value='Submit'></form>");

    for(var i = 0; i < response.length; i++) {
      var link = '<input class = "checkbox" type="checkbox" name=' + response[i].name + '> ' + response[i].name;
      listsObject.pageContainer.append("<div>" + link + "</div>");
    }
  })
}


var button_listener =  function() { $( "#page-container" ).on('submit','.add_list_button',function(event) {

  event.preventDefault();
  var listData = $(this).serialize();
  var url = "http://localhost:3000/lists";
  var type = "POST";

  $.ajax({
    url: url,
    type: type,
    data: listData,
    dataType: "json"
  }).done(function(response){
    // $('.add_list_button').hide()
    var link = '<input class = "checkbox" type="checkbox" name=' + response.name + '> ' + response.name + '<br>';
    $('#page-container').append("<div>" + link + "</div>");
    }).fail(function(response){
      console.log("fail",response)
    });
});
};

var checkbox_listener =  function() { $( ".checkbox" ).change(function(event) {
  var listObject = this
  event.preventDefault();

  var listData = $(this).serialize();
  console.log(listData)
  // I need a line to check what
  var url = "http://localhost:3000/lists/" + listObject.id + "/edit";
  var type = "POST";

  $.ajax({
    url: url,
    type: type,
    data: listData,
    dataType: "json"
  }).done(function(response){
    // $('.add_list_button').hide()
    console.log("success", response)
    // var link = '<input class = "checkbox" type="checkbox" name=' + response.name + '> ' + response.name + '<br>';
    // $('#page-container').append("<div>" + link + "</div>");
    }).fail(function(response){
      console.log("fail",response)
    });
});
};


// var add_beer_form = $('#addbeer').click(function(event) {

//       event.preventDefault();
//       var myURL = $(this).attr('action')

//     $.ajax({
//       url: myURL
//     }).done(function(response){
//     $('div').append(response);
//     });
//   });

// var edit_user_form = $('main').on('submit', '#updateuser', function(event){

//     event.preventDefault();
//     var contact = $(this).serialize();
//     var url = $(this).attr('action');
//     var type = "POST";

//     $.ajax({
//       url: url,
//       type: type,
//       data: contact
//     }).done(function(response){
//         $('#updateuser').hide()
//         $('main').append(response);
//       });
//   });


var list1 = new Lists;
list1.listAll();
button_listener();
checkbox_listener();



// Lists.prototype.create = function() {
//   this.request("http://localhost:3000/lists", function(listsObject, response) {
// }





