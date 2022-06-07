import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#stickerDisplay').click(function() {
    const word = $('#word').val();
    $('#word').val("");
if(word === ""){
  $('.warning').slideDown(300);
}
else {
    let request = new XMLHttpRequest();
    const link = `https://api.giphy.com/v1/stickers/search?api_key=${process.env.API_KEY}&q=${word}&limit=10&offset=0&rating=g&lang=en`

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", link, true);
    request.send();

   function getElements(response) {
    let gifEmbeddedUrl = response.data[0].embed_url;
    
    $('.showSticker').prepend(
      `<iframe src="${gifEmbeddedUrl}" width="360" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
    );
    
     
    }
    }
  });
});