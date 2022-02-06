"use strict";
var food;
var calories;
const key = "7c302975880645909c500fcde665037c";
var url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=7c302975880645909c500fcde665037c&addRecipeNutrition=true&query=";
var response;
var data;
async function search(name){
  url+=name;
  response = await fetch(url);
  data = await response.json();
  gotData(data);
}
function gotData(data){
  console.log(data.results[0].title,data.results[0].servings,data.results[0].nutrition.nutrients[0].amount);
}
// search("fried");
