
var players = ['Kobe Bryant', 'Michael Jordan', 'Lebron James', 'Magic Johnson'];


$(document).ready(function() {

    // ========================================================

    // displayplayerInfo function now re-renders the HTML to display the appropriate content. 
    function displayplayerInfo(){
        
        
        var player = $(this).attr('data-name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        // Creates AJAX call for the specific player being 
         $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div>')

                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var personImage = $('<img>');
                    personImage.attr('src', results[i].images.fixed_height_still.url);//makes the gifs appear still
                    personImage.attr('data-still', results[i].images.fixed_height_still.url);
                    personImage.attr('data-animate', results[i].images.fixed_height.url);
                    personImage.attr('data-state','still');
                    personImage.attr('class','personImage');

                    

                    gifDiv.append(p)
                    gifDiv.append(personImage)

                    $('#gifsAppearHere').prepend(gifDiv);
                }
           
                $('.personImage').on('click', function(){
                    var state = $(this).attr('data-state');
                    if (state == 'still') {//if the gif is still, then animate it onclick
                        $(this).attr('src', $(this).data('animate'));//attr stores data
                        $(this).attr('data-state', 'animate');
                    }
                    else{//if the gif is animated, then make still onclick
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                   
            });
         });   
    }   



    // ========================================================

    // Generic function for displaying player data 
    function renderButtons(){ 

        // Deletes the players prior to adding new players (this is necessary otherwise you will have repeat buttons)
        $('#buttonsView').empty();

        // Loops through the array of players
        for (var i = 0; i < players.length; i++){

            // Then dynamicaly generates buttons for each player in the array

            // Note the jQUery syntax here... 
            var a = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            a.addClass('player'); // Added a class 
            a.attr('data-name', players[i]); // Added a data-attribute
            a.text(players[i]); // Provided the initial button text
            $('#buttonsView').append(a); // Added the button to the HTML
        }
    }

    // ========================================================

    // This function handles events where one button is clicked
    $('#addplayer').on('click', function(){

        // This line of code will grab the input from the textbox
        var player = $('#player-input').val().trim();

        // The player from the textbox is then added to our array
        players.push(player);
        
        // Our array then runs which handles the processing of our player array
        renderButtons();

        // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
        return false;
    });

 

    // ========================================================

    // Generic function for displaying the playerInfo
    $(document).on('click', '.player', displayplayerInfo);


    // ========================================================

    // This calls the renderButtons() function
    renderButtons();


});