"use strict";
var food;
var calories;
const key = "7c302975880645909c500fcde665037c";
var url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=7c302975880645909c500fcde665037c&addRecipeNutrition=true&query=";
function search(name){
  url+=name;
  loadJSON(url,gotData);
}
function gotData(data){
  food = data;
  calories = results[0].nutrition.nutrients[0].amount;
  console.log(calories);
}
