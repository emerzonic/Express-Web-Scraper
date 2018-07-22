//====================================================
//SEND REQUEST TO ADD ARTICLE TO DATABASE
//====================================================
$(document).on("submit", "#articleForm", function (event) {
  event.preventDefault();
  var article = {
    title: $(this).find("input[name='title']").val(),
    img: $(this).find("input[name='img']").val(),
    summary: $(this).find("input[name='summary']").val(),
    writer: $(this).find("input[name='writer']").val(),
    url: $(this).find("input[name='url']").val(),
  };

  var requestUrl = $(this).attr("action");
  // Send the data using post
  $.ajax({
      method: "POST",
      url: requestUrl,
      data: article
    })
    .done(() => {
      $(this)
        .find(".saveButton")
        .text('Article SAVED!')
        .removeClass('inverted saveButton'); //remove the savebutton class and change button color
    });
});

//====================================================
//SEND REQUEST TO GET ONE ARTICLE FROM DATABASE
//====================================================
$(document).on("click", ".addNotesButton", function () {
  // Get the id for the clicked article:
  var articuleId = $(this).attr('id');
  //Send the data using post
  $.ajax({
      method: "GET",
      url: "/articles/saved/" + articuleId,
    })
    .done(function (foundArticule) {
      console.log(foundArticule);
      $("#articleTitle").text(foundArticule.title); //remove the savebutton class and change button
      $("#notesForm").attr("action", `/articles/${foundArticule._id}/notes`);
    });
});

//====================================================
//DELETE ARTICLE
//====================================================
$(document).on("click", ".removeArticleButton", function (event) {
  var articuleId = $(this).attr('id');
  // Send the data using post
  $.ajax({
      method: "GET",
      url: "/articles/saved/" + articuleId,
    })
    .done(function (articleToDelete) {
      articleToDelete.notes.forEach(function(note) {
        var $notesContents = $ `<div class="metadata">
      <span class="date">Created On ${note.createAt}</span>
  </div>
  <div class="text">
     <p>${note.text}</p>
  </div>
  <div class="actions">
      <a class="reply ui yellow button">Edit</a>
      <a class="save ui red button">Delete</a>
  </div>`;

  $('#commentDiv').prepend($notesContents);
});

      console.log(articleToDelete.notes);
      $("#deleteForm").attr("action", `/articles/delete/${articleToDelete._id}?_method=DELETE`); //remove the savebutton class and change button
    });
});


//large notes modal
$(function () {
  $(".addNotesButton").click(function () {
    $(".longer").modal('show');
  });
  $(".longer").modal({
    closable: true
  });
});


// small delete article modal
$(function () {
  $(".removeArticleButton").click(function () {
    $('.mini')
      .modal('show');
  });
  $('.mini').modal({
    closable: true
  });
});