var hamburger = document.querySelector ('.hamburger');
var nav = document.querySelector ('.menu');
hamburger.addEventListener ('click',navShow);

// nav function
function navShow() {
  document.querySelector('.menu').classList.toggle('showhide');
  document.querySelector('html').classList.toggle('no-scroll');
  document.querySelector('.hamburger').classList.toggle('open');
}

// function submenu
var shop = document.querySelector ('.active-menu');
shop.addEventListener ('click',menuShow);
function menuShow() {
  shop.nextElementSibling.classList.toggle('showMenu');
}

// --------Function for banner slider----------//
$(document).ready (function() {
  $('.banner-slider').slick ({
  slidesToShow: 1,
  autoplay: true,
  arrows:false,
	autoplaySpeed: 2000,
	vertical: true,
  });
});

//--------------reviews slider function-----------//
$(document).ready (function() {
	$('.reviews-slider').slick ({
		arrows:true,
		infinite: false,
		speed: 300,
		slidesToShow: 2,
		slidesToScroll: 1,
		// Responsive carousel
		responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: false,
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});  
});

//---------- Function for read more and read less og brands section-----------//
var read = document.getElementById('brandsButton');
var showContent = document.querySelector('.brands .learn-more');
read.addEventListener('click',function(){
	if(read.innerHTML === "learn more"){
		showContent.classList.add("show");
		read.innerHTML = "learn less";
		read.setAttribute('title','Learn Less');
	}
	else{
		showContent.classList.remove("show");	
		read.innerHTML = "learn more";
		read.setAttribute('title','Learn More');
	}
});

//---- Function for read more and read less og personalised product section------------//
var readMore = document.getElementById('productsButton');
var showImages = document.querySelector('.personalised-products .learn-more');
readMore.addEventListener('click',function(){
	if(readMore.innerHTML === "learn more"){
		showImages.classList.add("showImages");
		readMore.innerHTML = "learn less";
		readMore.setAttribute('title','Learn Less');
	}
	else{
		showImages.classList.remove("showImages");	
		readMore.innerHTML = "learn more";
		readMore.setAttribute('title','Learn More');
	}
});

//------------------- Function for image modal ----------------//
var imageModal = document.querySelector('.shop-lightbox');
var figure = document.querySelectorAll('.gallery figure');
var next = document.querySelector('.rightArrow');
var previous = document.querySelector('.leftArrow');
var figureArray = Array.from(figure);
var index;

for(var i=0; i<figureArray.length; i++){
	figureArray[i].addEventListener('click',openImageModal);
}
imageModal.addEventListener('click',closeImageModal);
document.querySelector('body').addEventListener('keyup',closeOnEsc);

// Function for open modal
function openImageModal(e){
	e.preventDefault();
	index = figureArray.indexOf(this);
  var currentImage = this.children[0].src;
  imageModal.children[0].children[0].src = currentImage ;
	imageModal.classList.add('showModal');
	document.querySelector('html').classList.add('no-scroll');
};

// Function to close modal
function closeImageModal(e){
	e.preventDefault();
	var cancel = document.querySelector('.shop-lightbox .cross');
	if(e.target == cancel){
		imageModal.classList.remove('showModal');
		document.querySelector('html').classList.remove('no-scroll');
	}
};

// Function for next slide
next.addEventListener('click',function(){
	if(index == figureArray.length-1){
		index = 0;
	}
	else {
		index ++;
	}
	var imageSource = figureArray[index].children[0].src;
	imageModal.children[0].children[0].src = imageSource;
});

// Function for previous slide
previous.addEventListener('click',function(){
	if(index == 0){
		index = figureArray.length-1;
	}
	else {
		index --;
	}
	var imageSource = figureArray[index].children[0].src;
	imageModal.children[0].children[0].src = imageSource;
});

// function for esc button
function closeOnEsc(e){
	e.preventDefault();
	if(e.which == 27){
    imageModal.classList.remove('showModal');
		document.querySelector('html').classList.remove('no-scroll');
	}
};

/*-------Function for load more images--------------*/
var result = document.getElementById('output');
var hit = document.getElementById('hit');

hit.addEventListener("click",function(){
  var request = new XMLHttpRequest();
  request.open('GET','./assets/vendor/imagesload.json',true);
  request.onload = function(){
    if(this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(request.responseText);  
      display(data);
    }
  };    
  request.send();
});

var num = 3;
function display(data){
  var rem = data.length%3;
  if(num == data.length-rem) {
    hit.style.display = "none";
    for(var i=num; i< num+rem; i++){
      var liRow = document.createElement("li"); 
      var img = document.createElement("img");
      img.src = data[i].img;
      liRow.appendChild(img);

      var span = document.createElement("span");
      span.textContent = data[i].span;
      liRow.appendChild(span);  

      var box = document.querySelector('.load-more');
      box.appendChild(liRow); 
    }
  } 
  else{ 
    for(var i=num; i< num+3; i++){
      var liRow = document.createElement("li"); 
      var img = document.createElement("img");
      img.src = data[i].img;
      liRow.appendChild(img);

      var span = document.createElement("span");
      span.textContent = data[i].span;
      liRow.appendChild(span);  
        
      var box = document.querySelector('.load-more');
      box.appendChild(liRow); 
    }
    num = num+3;   
  } 
}

// Fnction for email validation
var addId = document.getElementById('yes');
var offersForm = document.querySelector('.offers-form');
var userName = document.getElementById('emailId');
var regex = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

addId.addEventListener('click',validate);
function validate() {  
	if(!regex.test(userName.value)) {    
		alert("Invalid Email Id  :(");  
		clearBox();   
		return false;  		  
	}  
	// else if(check()){
	// 	clearBox();
	// } 
	else{
		var check = abc();
		if(check){
			return false;
		}else{
			store();    
			clearBox();
		}
	}  		  
};

var userArray = [];
function store(){  
	var userData = {    
		fname : userName.value  
	};  
	userArray.push(userData);  
	alert("Thank you for your request and interest in collaboration with us. :)");
};

function abc() {  
	userArray.forEach(function(element) { 
		if(element.fname === userName.value) {      
			alert("Already existing Email Id  :("); 
			return true;
		}  
	});
}

// Function to reset form
function clearBox() {  
	offersForm.reset();
};

// Function for scroll to top button
var btn = document.getElementById('top');
window.onscroll = function(){
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    btn.classList.add('showBtn');
  } else {
    btn.classList.remove('showBtn');
  }
}

btn.addEventListener('click',scrollTop);
function scrollTop(){
	document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}