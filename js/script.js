// JavaScript
function updateCheckboxCount() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checkedCount = Array.from(checkboxes).filter(function(checkbox) {
      return checkbox.checked;
    }).length;
  
    document.getElementById('count-checked-checkboxes').textContent = +checkedCount;
  }
  
  // Initialize count on page load
  updateCheckboxCount();
  
  // Update count whenever a checkbox is checked or unchecked
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i =  0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', updateCheckboxCount);
  }
  document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy");    
    var lazyloadThrottleTimeout;
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });
  