//====================================================
//SEND REQUEST TO ADD ARTICLE TO DATABASE
//====================================================
$(document).on("submit", "#articleForm", function (event) {
  // Stop form from submitting normally
  event.preventDefault();
  // Get some values from elements on the page:
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
        .removeClass('inverted saveButton'); //remove the savebutton class and change button
    });
});


//====================================================
//SEND REQUEST TO GET ONE ARTICLE FROM DATABASE
//====================================================
$(document).on("click", ".addNotesButton", function () {
  // Get some id from elements on the page:
  var articuleId = $(this).attr('id');
  // Send the data using post
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



// ====================================================
// ADD  NOTES TO ARTICLE
// ====================================================
// $(document).on("submit", "#notesForm", function () {
  // Stop form from submitting normally
  // event.preventDefault();
  // Get some values from elements on the page:
  // var articuleId = $(this).find(".submit").attr('id');
  // // var notes = $("#notes").val();
  // var notes = $(this).find("#notes").val();
  // // Send the data using post
  // console.log("id " + articuleId);
  // console.log("notes " + notes);
  // $("#notes").val("");



// $.ajax({
//     method: "POST",
//     url: requestUrl,
//     data: article
//   })
//   .done(() => {
//     $(this)
//       .find(".saveButton")
//       .text('Article SAVED!')
//       .removeClass('inverted saveButton'); //remove the savebutton class and change button
//   });
// });

//====================================================
//DELETE ARTICLE
//====================================================
$(document).on("click", ".removeArticleButton", function (event) {
  // Get some id from elements on the page:
  var articuleId = $(this).attr('id');
  // Send the data using post
  $.ajax({
      method: "GET",
      url: "/articles/saved/" + articuleId,
    })
    .done(function (articleToDelete) {
      console.log(articleToDelete);
      $("#deleteForm").attr("action", `/articles/delete/${articleToDelete._id}?_method=DELETE`); //remove the savebutton class and change button
    });
});






// home page sign up modal
$(function () {
  $(".addNotesButton").click(function () {
    $(".longer").modal('show');
  });
  $(".longer").modal({
    closable: true
  });
});

$(function () {
  $(".removeArticleButton").click(function () {
    $('.mini')
      .modal('show');
  });
  $('.mini').modal({
    closable: true
  });
});