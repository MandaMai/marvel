(function() {

let charName, charImg, tempImg;
let userInput = $("#userInput");
let apiKey = apikey="ts=1&apikey=8c341eb8a8058fa06e30e3cd5c608bc2&hash=ee5c3bb981328e44a00878da4bad4323"//api key without parameters
let apiUrl = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=8c341eb8a8058fa06e30e3cd5c608bc2&hash=ee5c3bb981328e44a00878da4bad4323&limit=100"//api url with basic parameters to control items selected to 100
let details = $('#getDetails');
let characters, tempEventUrl, characterID, searchUrl;
// $('#my-modal').modal({
//     show: 'false'})



$(function() {
getCharacters(apiUrl);

  //with value to search
          function getCharacters (url) {
          $.get(url, function(data){//call to api for information
              characters = data.data.results;
              for(let i = 0; i < characters.length; i++){
                charName = '<h2>'+characters[i].name+'</h2>';
                charID = characters[i].id;
                //create full image url
                tempImg = characters[i].thumbnail.path+"/standard_fantastic."+characters[i].thumbnail.extension;
                charImg = '<img src="'+ characters[i].thumbnail.path+"/standard_fantastic."+characters[i].thumbnail.extension+'" />';
                $('tbody').append('<tr class="characterRow"><td class="name">'+charName+'</td><td class="image">'+charImg+'</td><td><button type="button" data-id="'+charID+'" data-target="'+charName+'" data-img="'+tempImg+'" class="getDetails">Get Details</button></td></tr>');
              }
            })
          }//end getCharacters

            //get search value from user when button is clicked
            userInput.click(function(){
                      //console.log("value: "+$("#input").val());
                      if($("#input").val()=='')
                      {//if nothing is entered in the box reset page to default list
                                //console.log("reset")
                                $("tbody").html("");
                                 getCharacters(apiUrl);

                      }else {//populate page with list based on user's search value
                                console.log("running main search")
                                $("tbody").html("");
                                userInput = $("#input").val();
                                searchUrl = apiUrl + "&nameStartsWith=" + userInput;//update url with additional search paramter from user
                                getCharacters(searchUrl);
                                $("#input").val('');

                      }

            })
            //Event object to hold items
            function Event(name, description, heroes, heroesRet) {
              this.name=name;
              this.description=description;
              this.heroes=heroes;
              this.heroesRet=heroesRet;
            }
            //get character details when button is clicked and populate modal dialog box
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
                                    show: 'true'//show modal when data is populated
                                });
                      })


                }) ;
                //clean html tabs from strings 
                function cleanAnswer(tempAnswer) {
                      tempAnswer=tempAnswer.replace(/<(?:.|\n\i)*?>/gm, '');
                      return tempAnswer;
                    }



})//end of function that will only run after page has loaded
})()
