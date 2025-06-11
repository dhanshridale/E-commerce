// import $ from "jquery";
// $("h1").css("color","Purple");
// $("h1").css("font-size","30px");
// $("h1").text("summer season end");

function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}



// for slide show



let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";

}


// 


// adding in the cart with quantity

document.addEventListener('DOMContentLoaded', function() {
  // Add an event listener to all buttons with the class "submitButton"
  document.querySelectorAll('.submitButton').forEach(function(button) {
      button.addEventListener('click', function(event) {
          // Find the nearest text content within the parent div
          var textContent = this.closest('.textContainer').querySelector('.textContent').innerText;
          var quanval=this.closest('.textForm2').querySelector('.inputval').value;
        
          // Set the text content to the hidden input field
          this.closest('.textForm2').querySelector('.textToSubmit').value = textContent;
          this.closest('.textForm2').querySelector('.quantval').value = quanval;

          // Log to console to verify the text content
          // console.log('Text to submit:', textContent);
          // console.log(quanval)
      });
  });
});
// Quantity selector



// adding in the wishlist
document.addEventListener('DOMContentLoaded', function() {
  // Add an event listener to all buttons with the class "submitButton"
  document.querySelectorAll('.submitButton1').forEach(function(button) {
      button.addEventListener('click', function(event) {
          // Find the nearest text content within the parent div
          var textContent = this.closest('.textContainer').querySelector('.textContent').innerText;

          // Set the text content to the hidden input field
          this.closest('.textForm1').querySelector('.textToSubmit1').value = textContent;

          // Log to console to verify the text content
          console.log('Text to submit:', textContent);
      });
  });
});

// For Viewing the Product
document.addEventListener('DOMContentLoaded', function() {
  // Add an event listener to all buttons with the class "submitButton"
  document.querySelectorAll('.submitButton3').forEach(function(button) {
      button.addEventListener('click', function(event) {
          // Find the nearest text content within the parent div
          var textContent = this.closest('.textContainer').querySelector('.textContent').innerText;

          // Set the text content to the hidden input field
          this.closest('.textForm3').querySelector('.textToSubmit3').value = textContent;

          // Log to console to verify the text content
          console.log('Text to submit:', textContent);
      });
  });
});




