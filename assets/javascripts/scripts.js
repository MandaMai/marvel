(function() {

let charName, charImg, tempImg;
let userInput = $("#userInput");
let apiKey = apikey="ts=1&apikey=8c341eb8a8058fa06e30e3cd5c608bc2&hash=ee5c3bb981328e44a00878da4bad4323"
let apiUrl = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=8c341eb8a8058fa06e30e3cd5c608bc2&hash=ee5c3bb981328e44a00878da4bad4323&limit=100"
//let eventUrl = "https://gateway.marvel.com:443/v1/public/characters/"+characterID+"/events?"+ apiKey
let details = $('#getDetails');
let characters, tempEventUrl, characterID;




$(function() {
getCharacters(apiUrl);

  //with value to search
          function getCharacters (url) {
          $.get(url, function(data){
              characters = data.data.results;
              for(let i = 0; i < characters.length; i++){
                charName = '<h2>'+characters[i].name+'</h2>';
                charID = characters[i].id;

                tempImg = characters[i].thumbnail.path+"/standard_fantastic."+characters[i].thumbnail.extension;
                charImg = '<img src="'+ characters[i].thumbnail.path+"/standard_fantastic."+characters[i].thumbnail.extension+'" />';
                $('tbody').append('<tr class="characterRow"><td class="name">'+charName+'</td><td class="image">'+charImg+'</td><td><button type="button" data-id="'+charID+'" data-target="'+charName+'" data-img="'+tempImg+'" class="getDetails">Get Details</button></td></tr>');
              }
            })
          }//end getCharacters

            userInput.click(function(){
              $("tbody").html("");
              userInput = $(".form-control").val();
              let searchUrl = apiUrl + "&nameStartsWith=" + userInput;
              getCharacters(searchUrl);
            })

            $(document).on('click', '.getDetails' , function() {
                      console.log(cleanAnswer($(this).attr("data-target")));
                      console.log($(this).attr("data-img"));
                      console.log($(this).attr("data-id"));
                      charID = $(this).attr("data-id");
                      let imgUrl = apiUrl + "&name=" + cleanAnswer($(this).attr("data-target"));
                      console.log(imgUrl);
                      $.get(imgUrl, function(data) {
                                characters = data.data.results;
                                console.log(characters);
                                charName = characters[0].name;
                                console.log(charName);
                                charImg = '<img src="'+ characters[0].thumbnail.path+"/standard_fantastic."+characters[0].thumbnail.extension+'" />';
                                console.log(charImg);
                                charEvents = characters[0].events.items//[0].name;
                                console.log(charEvents);
                                test = charEvents[1].name;
                                console.log(test);
                                tempEventUrl="https://gateway.marvel.com/v1/public/characters/"+charID+"/events?"+ apiKey
                                console.log(tempEventUrl);
                                console.log("made it here")


                                //let charEvents =
                      })

                      $.get(tempEventUrl), function(eventData) {
                                console.log("made it the next step")
                                eventDesc = eventData.data.results.description;
                                console.log(eventDesc);
                                characterDesc = eventData.data.results.characters.available;
                                console.log(characterDesc);
                                characterRet = eventData.data.results.characters.returned;
                                console.log(characterRet);
                      }

                }) ;

                function cleanAnswer(tempAnswer) {
                      tempAnswer=tempAnswer.replace(/<(?:.|\n\i)*?>/gm, '');
                      return tempAnswer;
                    }

})//end of function that will only run after page has loaded
})()
