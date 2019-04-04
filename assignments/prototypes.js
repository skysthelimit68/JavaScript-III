/*
  Object oriented design is commonly used in video games.  
  
  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(atts) {
  this.createdAt = atts.createdAt;
  this.name = atts.name;
  this.dimensions = atts.dimensions;
}

GameObject.prototype.destroy = function () {
    return `${this.name} was removed from the game.`;
  }

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(atts) {
  GameObject.call(this, atts);
  this.healthPoints = atts.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function () {
  return `${this.name} took damage.`;
}
/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 
function Humanoid(atts) {
  CharacterStats.call(this, atts);
  this.team = atts.team;
  this.weapons = atts.weapons;
  this.language = atts.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function () {
  return `${this.name} offers a greeting in ${this.language}.`
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  function Villain(atts) {
    Humanoid.call(this, atts);
    this.attack = function(opponent) {
      opponent.healthPoints = opponent.healthPoints - randomizer();
      updateHeroScore(opponent);
      getGameMsg(opponent);
      counter++;
      updateButton();
      updateScreen(opponent);
    }
    this.totalDestruction = this.healthPoints <= 0? true : false;
  }

  Villain.prototype = Object.create(Humanoid.prototype);

  function Hero(atts) {
    Humanoid.call(this, atts);
    this.attack = function(opponent) { 
      opponent.healthPoints = opponent.healthPoints - randomizer();
      updateVillanScore(opponent);
      getGameMsg(opponent);
      counter++;
      updateButton();
      updateScreen(opponent);
     
    }
    this.totalDestruction = this.healthPoints <= 0? true : false;
  }

  Hero.prototype = Object.create(Humanoid.prototype);

  
  let hero;
  let vil;
  let counter;

  function startGame() {
    counter = 1;
    setupCharacter();    
    setupScreen(); 
    updateButton();
  }

  function setupCharacter() {
    hero = new Hero({name:"hero", createdAt:new Date(), dimensions:"large", team:"good", weapons:"gun", language:"pigkokolatin", healthPoints:50});
    vil = new Villain({name:"villan", createdAt:new Date(), dimensions:"large", team:"bad", weapons:"rifle", language:"piglatin", healthPoints:50});
  }
 

  function setupScreen() {
    el("startGame").classList="hidden";
    el("charWrapper").classList="show";
    el("gameMsg").classList="show";
    el("playAgain").classList="hidden";
    el("villanMsg").innerHTML = vil.healthPoints;
    el("heroMsg").innerHTML = hero.healthPoints;
    el("heroCardWrapper").classList="cardWrapper";
    el("villanCardWrapper").classList="cardWrapper";
    el("gameMsg").innerHTML = "";
  }

  function updateVillanScore(opponent) {
    if(opponent.healthPoints <=0) {
      el("villanMsg").innerHTML = 0;
    } else {
      el("villanMsg").innerHTML = opponent.healthPoints;
    }
  }

  function updateHeroScore(opponent) {
    if(opponent.healthPoints <=0) {
      el("heroMsg").innerHTML = 0;
    } else {
      el("heroMsg").innerHTML = opponent.healthPoints;
    }
  }
 
  function updateScreen(opponent) {
    let wrapper = (opponent == hero)? "heroCardWrapper": "villanCardWrapper";
    if(opponent.healthPoints <=0){
      el(wrapper).classList="charRemove";   
      el("playAgain").classList="show";
      
    }
  }

  function updateButton() {
    if(hero.healthPoints <= 0 || vil.healthPoints <=0){
      el("heroButton").disabled = true;
      el("villanButton").disabled = true;
    } else if (counter % 2 == 0) {
      el("heroButton").disabled = false;
      el("villanButton").disabled = true;
    } else {
      el("heroButton").disabled = true;
      el("villanButton").disabled = false;
    }
  }

  function getGameMsg(opponent) {
    if(opponent.healthPoints <= 0){
        el("gameMsg").innerHTML = opponent.destroy();
    } else {
        el("gameMsg").innerHTML = opponent.takeDamage();
    }
  }  

  function randomizer(){
      return Math.floor(Math.random() * 10) + 1;
    }
  function el(id){
    return document.getElementById(id);
  }
 