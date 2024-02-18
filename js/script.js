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
  
document.querySelector('.submit-button').addEventListener('click', function() {
  const serializer = new XMLSerializer();
  // Select all checkboxes
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Iterate over each checkbox
  checkboxes.forEach(function(checkbox) {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // Ensure the checked attribute is set to true
      checkbox.setAttribute('checked', 'true');
    }
  });

  const htmlContent = serializer.serializeToString(document);
  let cssContent = "";

  fetch('https://raw.githubusercontent.com/AndreAnimator/smash_checklist/main/assets/css/estilo.css')
  .then(response => response.text())
  .then(css => {
    cssContent = css
    // Now htmlWithCss contains your serialized HTML with the CSS included
  })
  .catch(error => console.error('Error fetching CSS:', error));

  /*for (let i =  0; i < document.styleSheets.length; i++) {
    let rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
    for (let j =  0; j < rules.length; j++) {
      cssContent += rules[j].cssText;
    }
  }*/

  const json = {
    html: htmlContent,
    css: "ul { list-style-type: none } , input: { display: inline-block } , img { display: inline-block, padding: 1vh, object-fit: contain } , .elemento { display: flex, height: 9vh } , .title-container { height: 10vh, display: flex } , .title { display: inline-block, width: 80vw, text-align: center, border-right: 0.5vh dotted grey } , .title-main { font-size: 4.35vh, font-style: bold, overflow-x: auto, white-space: nowrap } , .imagem-titulo { height: 5.10vh } , .title-sub { font-size: 2vh, overflow-x: auto, white-space: nowrap } , .score { padding-left: 2vw, width: 20vw, display: inline-block, font-size: 6vh, font-style: bold } , .submit-button { width: 20vw, height: 5vh, font-size: 2vh, text-align: center, border-radius: 5px, background-color: greenyellow, color: black, margin-right: 40vw, margin-left: 40vw, overflow-x: auto, overflow-y: auto, cursor: pointer } , .submit-button:hover { background-color: rgb(139, 227, 85), color: black } , .submit-button:active { background-color: rgb(34, 103, 35), color: whitesmoke }"
  };
  

  // Replace 'your-api-id' and 'your-api-key' with your actual API ID and key
  const apiId = "4ce5f2bb-e4c2-4ae3-95bc-61bf7408d0ca"
  const apiKey = "ea170492-64e7-46f0-b618-baf96a424b7f"

  const options = {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(apiId + ":" + apiKey)
    }
  }
  
  fetch('https://hcti.io/v1/image', options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .then(data => {
      // Image URL is available here
      console.log(data.url)
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        console.error('Failed to generate image:', data);
      }
    })
    .catch(err => console.error(err));
});