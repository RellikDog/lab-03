'use strict';

//render pics to page

const hornsGallery = [];
const keywords = [];
const keywordsFinal = [];
let getArray = [];
let removeDupl = [];
let lim = removeDupl.length;
const hornsHandlebars = [];

// let hornsImg;

function Horns(obj) {
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  hornsGallery.push(this);
  keywords.push(obj.keyword);
  keywordsFinal.push([ ...new Set(keywords)]);
  localStorage.setItem('keys', JSON.stringify(keywordsFinal));
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

function readJson () {

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

    })

}

$(() => readJson());

const popFilter = function() {

  getArray = JSON.parse(localStorage.getItem('keys'));
  $.each(getArray, function(index, element){ //From stack overflow

    if($.inArray(element, removeDupl) === - 1) removeDupl.push(element);

  });
  lim = removeDupl.length - 1;
  removeDupl = removeDupl[lim]; //Assigns value of last array in iteration

  for(let i in removeDupl) {
    let option = '<option value="'+removeDupl[i]+'">'+removeDupl[i]+'</option>' ;
    $('.dropdown-menu').append(option);
  }
}

getArray = JSON.parse(localStorage.getItem('keys'));

//add button to hide all pics but ones with selected data types

popFilter();

//selecting box filtering

$('select[name="horn-picks"]').on('change', function() {
  if($(this).val() === 'default'){
    $('main div').show()
  } else{
    let $selection = $(this).val();
    $('main div').hide()
    $(`div[class="${$selection}"]`).show()
  }
})

Horns.prototype.toHtml = function() {

  let templateHtml = $('#entry-template').html()
  let hornsTemplate = Handlebars.compile(templateHtml);
  let newHorns = hornsTemplate(this);
  console.log(newHorns);
  return newHorns;

};
console.log(hornsGallery)
hornsGallery.forEach(hornsObj => {
  hornsHandlebars.push(new Horns(hornsObj));
  
});

hornsHandlebars.forEach(ourNewHornsObj => {
  $('#photo-template').append( ourNewHornsObj.toHtml() );
});





