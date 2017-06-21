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

//hide chart section
function aChartHide() {
  var hide = document.getElementById('chartResults');
  var chide = document.getElementById('chart');
  hide.style.display = 'none';
}
//product constructor
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  this.conversion = 0;
  products.push(this);
}
//generate valid images
function getImage() {
  prodNew = [];
  while (prodNew.length < 3) {
    var select = Math.floor(Math.random() * (products.length));
    if (checkMatch(prodNew, products[select]) && checkMatch(prodLast, products[select])) {
      prodNew.push(products[select]);
      products[select].views++;
    }
  }
  prodLast = prodNew;
}
//check array for matches
function checkMatch(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value === array[i]) {
      return false;
    }
  }
  return true;
}
//draw new images
function render() {
  wipe();
  getImage();
  for (var i = 0; i < prodNew.length; i++) {
    var imgEl = document.createElement('img');
    imgEl.src = prodNew[i].path;
    imgEl.id = prodNew[i].name;
    picWheel.appendChild(imgEl);
  }
}
//update products on click, wipe, re-render, and exit program
function handleClick(event) {
  for (var i = 0; i < prodNew.length; i++) {
    if (event.target.id === prodNew[i].name) {
      prodNew[i].clicks++;
      totalClicks++;
      wipe();
    }
  }
  if (totalClicks === 25) {
    calcConversion();
    buttonUp('LIST', drawresults);
    buttonUp('CHART', itsAChartYall);
    picWheel.removeEventListener('click', handleClick);
  } else {
    calcConversion();
    render();
  }
}
//calculate conversion rate
function calcConversion() {
  for (var i = 0; i < products.length; i++) {
    if (products[i].views === 0) {
      products[i].conversion = 'NA';
    } else {
      products[i].conversion = products[i].clicks / products[i].views;
    }
  }
}
//wipe screen for redraw
function wipe() {
  while (imgPick.firstChild) {
    imgPick.removeChild(imgPick.firstChild);
  }
}
//render results buttons
function buttonUp(label, func) {
  // 1. Create the button
  var button = document.createElement('button');
  button.innerHTML = label;

  // 2. Append somewhere
  picWheel.appendChild(button);

  // 3. Add event handler
  button.addEventListener('click', func);
}
//render results list
function drawresults() {
  wipe();
  picWheel.removeEventListener('click', handleClick);
  var secEl = document.createElement('section');
  secEl.id = 'results';
  var h2El = document.createElement('h2');
  h2El.textContent = 'Results';
  secEl.appendChild(h2El);
  var ulEl = document.createElement('ul');
  for (var i = 0; i < products.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = products[i].clicks + ' votes for ' + products[i].name + '.';
    ulEl.appendChild(liEl);
  }
  secEl.appendChild(ulEl);
  picWheel.appendChild(secEl);
}
//CHHHAAAAAAAAAAAARRRRRRRRRRTTT!
function itsAChartYall() {
  var show = document.getElementById('chartResults');
  show.style.display = 'block';
  picWheel.parentNode.removeChild(picWheel);
  var ctx = document.getElementById('chart');
  var chartL = [];
  var chartD = [];
  for (var i = 0; i < products.length; i++) {
    chartL.push(products[i].name);
    chartD.push(products[i].clicks);
  }
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartL,
      datasets: [{
        label: '# of Clicks',
        data: chartD,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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
aChartHide();

picWheel.addEventListener('click', handleClick);
