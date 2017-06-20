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

            getHeroStat(20, 30);
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
            getHeroStatRight(20, 30);
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
var combatLogLeft = document.getElementById("left-combat-log");
var combatLogRight = document.getElementById("right-combat-log");
// -------------------------Combat Engine-------------------
function combatEngineLeftAttack(heroStatLeft, heroHealthRight) {
    if (heroHealthRightDiv.value > 0) {
        //if hero health > 0 attack
        var roll = Math.random();
        if (roll >= .15) {
            //if roll is greater than .15 it's a hit, else miss
            var roll2 = Math.random();
            if (roll2 >= .85) {
                //if hit is greater than .85 its a crit
                console.log("critical strike");
                var heroAttack = (heroStatLeft * roll) + (heroStatLeft * .15);
                if (heroHealthRightDiv.value <= heroAttack) {
                    //if hero health is greater than or = to attack game over
                    heroHealthRightDiv.value = 0;
                    heroHealthRightDiv.innerHTML = heroHealthRight;
                    combatLogRight.innerHTML = (Math.round(heroAttack) + " Critical Strike!");
                    console.log("Death Crit Left: ", heroAttack)
                    alert("Game Over, Player One Wins");
                }
                else {
                    heroHealthRightDiv.value = (heroHealthRight - heroAttack);
                    heroHealthRightDiv.innerHTML = heroHealthRightDiv.value;
                    combatLogRight.innerHTML = (Math.round(heroAttack) + " Critical Strike!");
                    console.log("crit Left: ", heroAttack);
                }
            }
            else {
                var heroAttack = (heroStatLeft * roll);
                console.log("non-crit :", heroAttack);
                console.log("non-crit hero health: ", heroHealthRight);
                console.log("non-crit hero health value: ", heroHealthRightDiv.value);
                if (heroHealthRightDiv.value <= heroAttack) {
                    console.log("non-crit OTK", heroAttack);
                    console.log("non-crit OTK health: ", heroHealthRightDiv.value);
                    heroHealthRightDiv.value = 0;
                    heroHealthRightDiv.innerHTML = heroHealthRight;
                    combatLogRight.innerHTML = Math.round(heroAttack);
                    alert("Game Over, Player One Wins");
                }
                else {
                    console.log("non-crit no OTK: ", heroAttack);
                    console.log("non-crit hero health: ", heroHealthRight);
                    heroHealthRightDiv.value -= (heroStatLeft * roll);
                    heroHealthRightDiv.innerHTML = heroHealthRightDiv.value;
                    // heroHealthRightDiv.value = heroHealthRight;
                    combatLogRight.innerHTML = Math.round(heroAttack);
                }
            }
        }
        else {
            combatLogRight.innerHTML = "Miss! Player Two Heals for " + heroStatRight;
            heroHealthRightDiv.value += heroStatRight;
        }
    }
    else {
        alert("Game Over! Player One Wins!");
    }
}
function combatEngineRightAttack(heroStatRight, heroHealthLeft) {
    if (heroHealthLeftDiv.value > 0) {
        //if hero health > 0 attack
        var roll = Math.random();
        if (roll >= .15) {
            //if roll is greater than .15 it's a hit, else miss
            var roll2 = Math.random();
            if (roll2 >= .85) {
                //if hit is greater than .85 its a crit
                console.log("critical strike");
                var heroAttack = (heroStatRight * roll) + (heroStatRight * .15);
                if (heroHealthLeftDiv.value <= heroAttack) {
                    //if hero health is greater than or = to attack game over
                    heroHealthLeftDiv.value = 0;
                    heroHealthLeftDiv.innerHTML = heroHealthLeft;
                    combatLogLeft.innerHTML = (Math.round(heroAttack) + " Critical Strike!");
                    console.log("Death Crit Left: ", heroAttack)
                    alert("Game Over, Player Two Wins");
                }
                else {
                    heroHealthLeftDiv.value = (heroHealthLeftDiv.value - heroAttack);
                    heroHealthLeftDiv.innerHTML = heroHealthLeftDiv.value;
                    combatLogLeft.innerHTML = (Math.round(heroAttack) + " Critical Strike!");
                    console.log("crit Left: ", heroAttack);
                }
            }
            else {
                var heroAttack = (heroStatRight * roll);
                console.log("non-crit :", heroAttack);
                console.log("non-crit hero health: ", heroHealthLeft);
                console.log("non-crit hero health value: ", heroHealthLeftDiv.value);
                if (heroHealthLeftDiv.value <= heroAttack) {
                    console.log("non-crit OTK", heroAttack);
                    console.log("non-crit OTK health: ", heroHealthLeftDiv.value);
                    heroHealthLeftDiv.value = 0;
                    heroHealthLeftDiv.innerHTML = heroHealthLeft;
                    combatLogLeft.innerHTML = Math.round(heroAttack);
                    alert("Game Over, Player Two Wins");
                }
                else {
                    console.log("non-crit no OTK: ", heroAttack);
                    console.log("non-crit hero health: ", heroHealthLeft);
                    heroHealthLeftDiv.value -= (heroStatRight * roll);
                    heroHealthLeftDiv.innerHTML = heroHealthLeftDiv.value;
                    combatLogLeft.innerHTML = Math.round(heroAttack);
                }
            }
        }
        else {
            combatLogLeft.innerHTML = "Miss! Player One Heals for " + heroStatLeft;
            heroHealthLeftDiv.value += heroStatLeft;
        }
    }
    else {
        alert("Game Over! Player Two Wins!");
    }
}
// -----------------------End Combat Engine___________________________

window.addEventListener("keydown", checkKeyPressed, false);
 
function checkKeyPressed(e) {
    if (e.keyCode == "187") {
        combatEngineRightAttack(heroStatRight, heroHealthLeft);
    }
    else if (e.keyCode == "192"){
        combatEngineLeftAttack(heroStatLeft, heroHealthRight);
    }
}
// --------------------------Engage Combat___________________________

function engageCombat() {
    combatEngineRightAttack(heroStatRight, heroHealthLeft);
    combatEngineLeftAttack(heroStatLeft, heroHealthRight);
}
// -----------------------Engage Combat END_______________________
