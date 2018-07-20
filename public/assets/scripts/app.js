$('.ui.modal')
  .modal()
;




// $('form')
//     .submit(function(evt) {
//         evt.preventDefault();
//         alert('submitted');
//     })
// ;



$(document).on('click','#savebutton',function () { 
  $(this).text('Article Saved').removeAttr( "type" );
  // $(this);
});