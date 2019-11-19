'use strict';

$(document).ready(function() {
  // This function gets the data from the YouTube API and displays it on the page
  function getResults(searchTerm) {
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
        "part": "snippet",
        "key": "AIzaSyDeesVroneRO7Jl0Aax3yNoJWUjeYYjvOs",
        "q": searchTerm,
        "maxResults": 50
      },
      function(data) {
        if (data.pageInfo.totalResults == 0) {
          alert("No results!");
        }
        // If no results, empty the list
        displayResults(data.items);
      }
    );
  }

  //Display results in ul
  function displayResults(videos) {
    var html = "";
    $.each(videos, function(index, video) {
      // Append results li to ul
      console.log(video.snippet.title);
      console.log(video.snippet.thumbnails.high.url);
      html = html + "<li><p class='line-clamp'>" + video.snippet.title +
        "</p><a target='_blank' href='https://www.youtube.com/watch?v=" + video.id.videoId + "'><img src='" + video.snippet.thumbnails.high.url + "'/></a></li>";
    });
    $("#search-results ul").html(html);
  }

  //Use search term
  $("#search-form").submit(function(event) {
    event.preventDefault();
    getResults($("#search-term").val());
  });
});