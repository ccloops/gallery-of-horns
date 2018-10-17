'use strict';

Image.all = [];

function Image(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

Image.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let templateClone = $('div[class="clone"]');
  templateClone.html($('#photo-template').html());
  templateClone.find('h2').text(this.title);
  templateClone.find('img').attr('src', this.image_url);
  templateClone.find('p').text(this.description);
  templateClone.attr('class', this.keyword);
  templateClone.removeClass('clone');
}

Image.requestData = () => {
  $.get('../data/page-1.json')
  .then(data => {
      data.forEach(item => {
        Image.all.push(new Image(item));
      });

    Image.all.forEach(image => {
      $('main').append(image.render());
    })
Image.populateFilters();
    
  })
}

Image.populateFilters = () => {
  let selectedItems = [];

  Image.all.forEach(image => {
    if(!selectedItems.includes(image.keyword)) {
      selectedItems.push(image.keyword);
      $('select').append(`<option>${image.keyword}</option>`)
    }
  })
}


$(() => Image.requestData());
