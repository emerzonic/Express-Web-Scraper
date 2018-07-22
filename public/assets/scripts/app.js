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
  // Send the article to be created
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


//==================================================================
//GET THE ARTICLE ID AND SEND IT OVER TO THE DELETE FORM URL IN THE MODAL
//==================================================================
$(".removeArticleButton").click(function () {
  var articleId = $(this).attr('id');
  console.log(articleId);
  $("#deleteForm").attr("action", `/${articleId}?_method=DELETE`);
});


// small delete article confirmation modal
$(function () {
  $(".removeArticleButton").click(function () {
    $('.mini')
      .modal('show');
  });
  $('.mini').modal({
    closable: true
  });
});


$(function () {
  $('.message .close')
    .on('click', function () {
      $(this)
        .closest('.message')
        .transition('fade');
    });
});