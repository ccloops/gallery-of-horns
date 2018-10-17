'use strict';

HornImage.all = [];

function HornImage(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

HornImage.prototype.render = function() {
  $('main').append('<div class="image-container"></div>');
  let $imageContainer = $('div[class="image-container"]');
  $imageContainer.html($('#photo-template').html());
  $imageContainer.find('h2').text(this.title);
  $imageContainer.find('img').attr('src', this.image_url);
  $imageContainer.find('p').text(this.description);
  $imageContainer.attr('class', this.keyword);
  $imageContainer.removeClass('image-container');
}

HornImage.requestData = () => {
  $.get('./data/page-1.json')
  .then(data => {
      data.forEach(item => {
        HornImage.all.push(new HornImage(item));
      });

    HornImage.all.forEach(image => {
      $('main').append(image.render());
    })
    HornImage.populateFilters();
  })
  .then(HornImage.filterSelected);
}

HornImage.populateFilters = () => {
  let selectedItems = [];

  HornImage.all.forEach(image => {
    if(!selectedItems.includes(image.keyword)) {
      selectedItems.push(image.keyword);
      $('select').append(`<option>${image.keyword}</option>`)
    }
  })
}

HornImage.filterSelected = () => {
  $('select').on('change', function() {
    let selection = $(this).val();
    if(selection !== 'filter by keyword') {
      $('div').hide();
      $('div').removeClass('selected');
      HornImage.all.forEach(image => {
        if(image.keyword === selection) {
          $(`div[class="${selection}"]`).addClass('selected').fadeIn();
        }
      });
      $(`option[value="${selection}"]`).fadeIn();
    }
  });

}

$(() => HornImage.requestData());
