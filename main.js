var PUBLIC_KEY = "ff193951be17b67d0141424b715b1667";
var PRIV_KEY = "82af13342c8786f92a06541076f77bbfdcd61ea1";
var myResults;



// ________________________________Hero DOM_____________________________

function renderHero(heroData) {
    //   var heroContainer = document.querySelector('.heroContainer');
    var heroHeader = document.querySelector(".hero-name-left");
    heroHeader.innerHTML = heroData.name;
    var heroPhotoRight = document.getElementById("hero-photo-left").src = heroData.thumbnail.path + '.jpg';
}
function renderHeroRight(heroData) {
    //   var heroContainerRight = document.querySelector('.heroContainerRight'); 
    var heroHeaderRight = document.querySelector('.hero-name-right');
    heroHeaderRight.innerHTML = heroData.name;
    var heroPhotoRight = document.getElementById("hero-photo-right").src = heroData.thumbnail.path + '.jpg';
}


// ________________________________Hero DOM_END_________________________
// _______________________Input Event Listener______________________
var inputElement = document.querySelector('#input');
inputElement.addEventListener('keydown', function (evt) {

    if (event.keyCode === 13) {
        console.log("event", evt.target.value);
        var inputValue = evt.target.value;
        getMarvelResponse(inputValue);
    }
})

var inputElementRight = document.querySelector('#input-right');
inputElementRight.addEventListener('keydown', function (evt) {

    if (event.keyCode === 13) {
        console.log("event", evt.target.value);
        var inputValueRight = evt.target.value;
        getMarvelResponseRight(inputValueRight);
    }
})
// _______________________Input Event Listener END___________________

// _________________________MARVEL API_________________________________


function getMarvelResponse(inputValue) {
    console.log("HERO VALUE: ", inputValue);
    var ts = new Date().getTime();
    var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    var url = 'http://gateway.marvel.com:80/v1/public/characters';
    $.getJSON(url, {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        name: inputValue
    })
        .done(function (data) {
            getHeroStat(25, 40);
            getHeroHealth(50, 100);
            renderHero(data.data.results[0]);
        })
        .fail(function (err) {
            console.log(err);
        });

};

function getMarvelResponseRight(inputValueRight) {

    var ts = new Date().getTime();
    var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    var url = 'http://gateway.marvel.com:80/v1/public/characters';
    $.getJSON(url, {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        name: inputValueRight
    })
        .done(function (data) {
            getHeroStatRight(25, 40);
            getHeroHealthRight(50, 100);
            renderHeroRight(data.data.results[0]);
        })
        .fail(function (err) {
            console.log(err);
        });

};
// _________________________MARVEL API_________________________________
var heroHealthLeftDiv = document.querySelector('.hero-health-left');
var heroHealthRightDiv = document.querySelector('.hero-health-right');
var heroHealthLeft = 0;
var heroHealthRight = 0;
// -------------------------BATTLE-Health----------------------

function getHeroHealth(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    heroHealthLeft = Math.floor(Math.random() * (max - min + 1)) + min;

    heroHealthLeftDiv.innerHTML = heroHealthLeft;
    heroHealthLeftDiv.max = heroHealthLeft;
    heroHealthLeftDiv.value = heroHealthLeft;
    console.log(heroHealthLeft);

    return;
}

function getHeroHealthRight(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    heroHealthRight = Math.floor(Math.random() * (max - min + 1)) + min;
    heroHealthRightDiv.innerHTML = heroHealthRight;
    heroHealthRightDiv.max = heroHealthRight;
    heroHealthRightDiv.value = heroHealthRight;
    console.log(heroHealthRight);

    return;
}
// -------------------------BATTLE-Health-END-----------------
var heroStatLeftDiv = document.querySelector('.hero-power-left');
var heroStatRightDiv = document.querySelector('.hero-power-right');
var heroStatLeft = 0;
var heroStatRight = 0;

// -------------------------BATTLE-Power----------------------

function getHeroStat(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    heroStatLeft = Math.floor(Math.random() * (max - min + 1)) + min;


    heroStatLeftDiv.innerHTML += heroStatLeft;
    console.log(heroStatLeft);
    return;
}

function getHeroStatRight(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    heroStatRight = Math.floor(Math.random() * (max - min + 1)) + min;


    heroStatRightDiv.innerHTML += heroStatRight;
    console.log(heroStatRight);

    return;
}
// -------------------------BATTLE-Power END-------------------

// -------------------------Combat Engine-------------------
function combatEngineLeftAttack(heroStatLeft, heroHealthRight) {
    console.log("Engine Left");
    console.log("hero powerpre if: ", heroStatLeft);
    
    if (heroHealthRightDiv.value > 0) {
        //if hero health > 0 attack
        console.log("First If");
        var roll = Math.random();
        console.log('heropower: ', heroStatLeft);
        console.log("roll", roll);
        if (roll >= .15) {
            //if roll is greater than .15 it's a hit, else miss
            var roll2 = Math.random();
            console.log(roll2);
            console.log("second If", heroHealthRight);
            if (roll2 >= .85) {
                //if hit is greater than .85 its a crit
                console.log("critical strike");
                var heroAttack = (heroStatLeft * roll) + (heroStatLeft * .15);
                console.log("third If", heroAttack);
                console.log("3ifhealth", heroHealthRight);
                if (heroHealthRight <= heroAttack) {
                    //if hero health is greater than or = to attack game over
                    heroHealthRightDiv.value = 0;
                    heroHealthRightDiv.innerHTML = heroHealthRight;
                    alert("Game Over, Hero Left Wins");
                }
                else {
                    heroHealthRight -= heroAttack;
                    heroHealthRightDiv.value = heroHealthRight - heroAttack;
                    console.log("third if else", heroHealthRightDiv.value);
                    heroHealthRightDiv.innerHTML = heroHealthRight;
                }
            }
            else {
                var heroAttack = (heroStatLeft * roll);

                if (heroHealthRight <= heroAttack) {
                    heroHealthRightDiv.value = 0;
                    heroHealthRightDiv.innerHTML = heroHealthRight;
                    console.log("HERO HEALTH HIT: ", heroHealthRight);
                    alert("Game Over, Hero Left Wins");
                }
                else {
                    console.log("second if else");
                    heroHealthRight -= (heroStatLeft * roll);
                    heroHealthRightDiv.innerHTML = heroHealthRight;
                    heroHealthRightDiv.value = heroHealthRight;
                }
            }
        }
        else {
            console.log("Miss");
        }
    }

    else {
        alert("Game Over!");
    }
}
function combatEngineRightAttack(heroStatRight, heroHealthLeft) {
    console.log("Engine Right");
    console.log("hero power pre if: ", heroStatRight);
    if (heroHealthLeftDiv.value >= 0) {
        console.log("First If");
        var roll = Math.random();
        console.log('heropower: ', heroStatRight);
        console.log("roll", roll);
        if (roll >= .15) {
            var roll2 = Math.random();
            console.log(roll2);
            console.log("second If", heroHealthLeft);
            
            if (roll2 >= .85) {
                console.log("critical strike");
                var heroAttack = (heroStatRight * roll) + (heroStatRight * .15);
                console.log("third If", heroAttack);
                console.log("3ifhealth", heroHealthLeft);
             
                if (heroHealthLeft <= heroAttack) {
                    heroHealthLeftDiv.value = 0;
                    heroHealthLeftDiv.innerHTML = heroHealthLeft;
                    alert("Game Over, Hero Right Wins");
                }
                else {
                
                    heroHealthLeftDiv.value = heroHealthLeft - heroAttack;
                    heroHealthLeftDiv.innerHTML = heroHealthLeft;

                    console.log("third if else", heroHealthLeftDiv.value);
                }
            }
            else {
                var heroAttack = (heroStatRight * roll);
                if (heroHealthLeft <= heroAttack) {
                    heroHealthLeftDiv.value = 0;
                    heroHealthLeftDiv.innerHTML = heroHealthLeft;

                    console.log("HERO HEALTH HIT: ", heroHealthLeft);
                    alert("Game Over, Hero Left Wins");
                }
                else {
                    console.log("second if else");
                    heroHealthLeft -= heroAttack;
                    heroHealthLeftDiv.innerHTML = heroHealthLeft;
                    heroHealthLeftDiv.value = heroHealthLeft;
                    
                }
            }
        }
        else {
            console.log("Miss");
        }
    }
    else {
        alert("Game Over!");
    }
}
// -----------------------End Combat Engine___________________________

// --------------------------Engage Combat___________________________

function engageCombat() {
    combatEngineRightAttack(heroStatRight, heroHealthLeft);
    combatEngineLeftAttack(heroStatLeft, heroHealthRight);
}
// -----------------------Engage Combat END_______________________
