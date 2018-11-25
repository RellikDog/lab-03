'use strict';

//render pics to page

var hornsGallery = [];

var keywords = [];

var keywordsFinal = [];

let getArray = [];

let removeDupl = [];

let lim = removeDupl.length;

// let hornsImg;
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
//

function Horns(obj) {

  this.title = obj.title;

  this.img=`<img src="${obj.image_url}">`;

  this.description = obj.description;
  this.keyword = obj.keyword;

  this.keyword2 =`class ="${obj.keyword}"`;

  hornsGallery.push(this);

  keywords.push(this.keyword);

  // keywordsFinal.push([ ...new Set(keywords)]);

  // localStorage.setItem('keys', JSON.stringify(keywordsFinal));

}

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

Horns.prototype.render2 = function(){
  var source   = document.getElementById('tempi').innerHTML;
  var template = Handlebars.compile(source);

  var context = this;
  var html    = template(context);
  $('main').append(html);
}

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

        horns.render2();

      })
      popFilter2();
    })
}

$(() => readJson1());


function readJson2 () {
  $('#but1').hide();
  $('#but2').show();
  $('main div').hide();
  hornsGallery = [];
  keywords = [];
  keywordsFinal = [];
  getArray = [];
  removeDupl = [];
  $.get('data/page-2.json', 'json')

    .then(data => {

      data.forEach(hornsObj => {

        new Horns(hornsObj);

      })

    })

    .then(function() {

      hornsGallery.forEach(horns =>{

        horns.render2();

      })
      popFilter2();
    })
}



//

// const popFilter = function() {

//   getArray = JSON.parse(localStorage.getItem('keys'));

//   $.each(getArray, function(index, element){ //From stack overflow

//     if($.inArray(element, removeDupl) === -1) removeDupl.push(element);

//   });
//   lim = removeDupl.length - 1;
//   removeDupl = removeDupl[19];

//   for(let i in removeDupl) {

//     $('.dropdown-menu').append( '<option value="'+removeDupl[i]+'">'+removeDupl[i]+'</option>' );

//   }

// }

// getArray = JSON.parse(localStorage.getItem('keys'));

// //add button to hide all pics but ones with selected data types

// popFilter();

//selecting box filtering

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

// //make button(
// var makeButt = function(){
//   let butt = $('<button type="button"> more horns  </button>').html();
//   $('header').append(butt);
// }
// makeButt();
