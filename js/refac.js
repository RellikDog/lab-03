'use strict';
var hornsGallery = [];
var keywords = [];
var keywordsFinal = [];
//make filters func
const popFilter2 = function(){
  for(var i = 0; i < keywords.length; i++){
    if(keywordsFinal.indexOf(keywords[i])=== -1){
      keywordsFinal.push(keywords[i]);
    }
  }
  for(let i in keywordsFinal){
    $('.dropdown-menu').append(`<option value="${keywordsFinal[i]}">${keywordsFinal[i]}</option>`);
  }
}
//constructor func for data
function Horns(obj) {
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  hornsGallery.push(this);
  keywords.push(this.keyword);
}
//make each horn
Horns.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let $clone = $('div[class="clone"]');
  let hornsTemplate = $('#photo-template').html();
  $clone.html(hornsTemplate);
  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);
  $clone.removeClass('clone');
  $clone.attr('class', this.keyword);
}
// first page
function readJson1 () {
  $('#but1').show();
  $('#but2').hide();
  $('main div').hide();
  hornsGallery = [];
  keywords = [];
  keywordsFinal = [];
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(hornsObj => {
        new Horns(hornsObj);
      })
    })
    .then(function() {
      hornsGallery.forEach(horns =>{
        horns.render();
      })
      popFilter2();
    })
}
$(() => readJson1());
//second page
function readJson2 () {
  $('#but1').hide();
  $('#but2').show();
  $('main div').hide();
  hornsGallery = [];
  keywords = [];
  keywordsFinal = [];
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach(hornsObj => {
        new Horns(hornsObj);
      })
    })
    .then(function() {
      hornsGallery.forEach(horns =>{
        horns.render();
      })
      popFilter2();
    })
}
//drop event
$('select[name="horn-picks"]').on('change', function() {
  if($(this).val() === 'default'){
    $('main div').show()
  } else{
    let $selection = $(this).val();
    $('main div').hide()
    $(`div[class="${$selection}"]`).show()
    console.log($(this).val())
  }
});

