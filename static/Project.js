"use strict";
var food;
var calories;
const key = "67944702ff914d50b6e5b5e87c49ee4f";
var urlurl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=67944702ff914d50b6e5b5e87c49ee4f&addRecipeNutrition=true&query=";
var response;
var data;
let fName, servings, fCalories
async function search(name) {
  let url = urlurl+name;
  response = await fetch(url);
  data = await response.json();
  gotData(data);
}

function gotData(data) {
  fName = data.results[0].title
  servings = data.results[0].servings
  fCalories = data.results[0].nutrition.nutrients[0].amount
  fCalories = (parseFloat(fCalories)/parseFloat(servings)).toFixed(1)
  fCalories = String(fCalories)
  console.log(fName, servings, fCalories);
  $("#table").append(
    "<tr class=\"text-center\">" +
    "<th scope=\"row\">" + count + "</th>" +
    "<td class=\"fw-bold\">" + fName + "</td>" +
    "<td> <input class=\"form-control\"placeholder=\"Enter Number of Servings:\"> </td>" +
    "<td class=\"fw-bold calorie\">" + fCalories + "</td>" +
    "</tr>");
}



let count = 0

function isValidString(str1) {
  return str1 != null && typeof str1 === "string" && str1.length > 0;
}

$("#btn1").click(function () {
  let food
  food = $("#search").val()
  if (isValidString(food) === false) {
    alert(food + " is not a valid input")
  } else {
    food = search(food)
    count++

    let todayTotalCalories = 0
    for (let i = 1; i < table.rows.length; i++) {
      todayTotalCalories = todayTotalCalories + parseInt(table.rows[i].cells[3].innerHTML)
    }
    $("#totalCalories").text(todayTotalCalories)
  }


})



// "id=\""+count+"\""

// search("Bigbiitoased");
