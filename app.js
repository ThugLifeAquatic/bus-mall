'use strict';
//total click counter
var totalClicks = 0;
//all products
var products = [];
//products painted last
var prodLast = [];
//products to be painted
var prodNew = [];
//image container
var picWheel = document.getElementById('imgPick');

//product object
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  this.conversion = 0;
  products.push(this);
}

function calcConversion() {
  for (var i = 0; i < products.length; i++) {
    if (products[i].views === 0) {
      products[i].conversion = 'NA';
    } else {
      products[i].conversion = products[i].clicks / products[i].views;
    }
  }
}

function checkQ(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value === array[i]) {
      return false;
    }
  }
  return true;
}

function getImage() {
  prodNew = [];
  while (prodNew.length < 3) {
    var select = Math.floor(Math.random() * (products.length));
    if (checkQ(prodNew, products[select]) && checkQ(prodLast, products[select])) {
      prodNew.push(products[select]);
      products[select].views++;
    }
  }
  prodLast = prodNew;
}

function handleClick(event) {
  for (var i = 0; i < prodNew.length; i++) {
    if (event.target.id === prodNew[i].name) {
      prodNew[i].clicks++;
      totalClicks++;
      var remEL = document.getElementById('imgPick');
      while (remEL.firstChild) {
        remEL.removeChild(remEL.firstChild);
      }
      if (totalClicks === 24) {
        var secEl = document.createElement('section');
        secEl.id = 'results';
        var h2El = document.createElement('h2');
        h2El.textContent = 'Results';
        secEl.appendChild(h2El);
        picWheel.appendChild(secEl);
        picWheel.removeEventListener('click', handleClick);
      } else {
        render();
      }
      calcConversion();
    }
  }
}

function render() {
  getImage();
  for (var i = 0; i < prodNew.length; i++) {
    var imgEl = document.createElement('img');
    imgEl.src = prodNew[i].path;
    imgEl.id = prodNew[i].name;
    picWheel.appendChild(imgEl);
  }
}

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dogduck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('petSweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('waterCan', 'images/water-can.jpg');
new Product('wineGlass', 'images/wine-glass.jpg');
render();

picWheel.addEventListener('click', handleClick);
