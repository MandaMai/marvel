(function() {

let charName, charImg, tempImg;
let userInput = $("#userInput");
let apiKey = apikey="ts=1&apikey=8c341eb8a8058fa06e30e3cd5c608bc2&hash=ee5c3bb981328e44a00878da4bad4323"
let apiUrl = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=8c341eb8a8058fa06e30e3cd5c608bc2&hash=ee5c3bb981328e44a00878da4bad4323&limit=100"
let details = $('#getDetails');
let characters, tempEventUrl, characterID, searchUrl;
// $('#my-modal').modal({
//     show: 'false'})



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
                      if($(".form-control").val()!="")
                      {
                                $("tbody").html("");
                                userInput = $(".form-control").val();
                                searchUrl = apiUrl + "&nameStartsWith=" + userInput;
                                getCharacters(searchUrl);
                      }else {
                               getCharacters(apiUrl);
                      }

            })

            function Event(name, description, heroes, heroesRet) {
              this.name=name;
              this.description=description;
              this.heroes=heroes;
              this.heroesRet=heroesRet;
            }

            $(document).on('click', '.getDetails' , function() {
                    let characterName = $(this).attr("data-target");
                      charID = $(this).attr("data-id");
                      //get event desc
                      tempEventUrl="http://gateway.marvel.com/v1/public/characters/"+charID+"/events?"+ apiKey
                      characterImage = $(this).attr("data-img");

                      $.get(tempEventUrl, function(data) {
                                let events = data.data.results;
                                let eventCount=(events.length);
                                if(eventCount>=5){
                                          $('.modal-body').html("");
                                          for(let i = 0; i < 5; i++){
                                                  $('#modalTitle').html(characterName);
                                                  $('.modal-body').append('<h3 class="eventName">'+events[i].title+'</h3><h4 class="eventDesc">'+events[i].description+'</h4><p class="heroes">Number of Characters in Event: '+events[i].characters.available+'</p><p class="returned">Characters that Survived Event: '+events[i].characters.returned+'</p>');
                                          }//end for loop
                                          $('.modal-content').css('background-image', 'url('+characterImage+')');
                                }else{
                                          $('.modal-body').html("");
                                          $('#modalTitle').html(characterName);
                                          $('.modal-body').html('<h2 class="eventName">There are no events for this character</h2>');
                                          console.log(characterImage);
                                          $('.modal-content').css('background-image', 'url('+characterImage+')');
                                          //$('body').css('background-image', 'url(../images/backgrounds/header-top.jpg)');
                                }
                                $('#my-modal').modal({
                                    show: 'true'
                                });
                      })


                }) ;

                function cleanAnswer(tempAnswer) {
                      tempAnswer=tempAnswer.replace(/<(?:.|\n\i)*?>/gm, '');
                      return tempAnswer;
                    }



})//end of function that will only run after page has loaded
})()
