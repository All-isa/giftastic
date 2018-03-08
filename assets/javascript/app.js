//create buttons for search topic options (use loop to append buttons)
//link buttons to search GIPHYAPI 
//buttons deliver giphy static images under buttons (10 images)
//reset button
//


//array of emotions as our search topic
var topics = ["sad", "happy", "bored", "angry", "eyeroll", "angry", "excited", "tired", "relief", "nervous",  "anxious"];

//function for the button to create the new button
$("#addTopic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#giphy-search").val().trim();
    topics.push(topic);
    createButton();
})

//function to create buttons 
function createButton() {
    $("#giphys").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("emotion");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
    $("#giphys").append(a);
    }
}
createButton();

$(document).on("click",".gif", function() {
    var state = $(this).attr("data-state");
    console.log($(this));
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//function showGiphys () {
$(document).on("click","button", function() {
    
    var emotion = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4g1w9dfloOgsVxyUAHczgB4varF6hPMq&q=" + emotion + "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
       url: queryURL,
       method: "GET"
    })
    .done(function(response) {
        console.log(response);
        var results = response.data;

        for (i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var giphyImage = $("<img class='gif'>");
                giphyImage.attr("src", results[i].images.fixed_height_still.url);
                giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                giphyImage.attr("data-state", "still");
                gifDiv.append(p);
                gifDiv.append(giphyImage);
                $("#gifsView").prepend(gifDiv);
            }
            
        }
    }
)}
)