"use strict";
var food;
var calories;
const key = "b17cfe9948de44bba967702848474dc8";
var urlurl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=b17cfe9948de44bba967702848474dc8&addRecipeNutrition=true&query=";
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
  console.log(fName, servings, fCalories);
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

    $("#table").append(
      "<tr class=\"text-center\">" +
      "<th scope=\"row\">" + count + "</th>" +
      "<td class=\"fw-bold\">" + fName + "</td>" +
      "<td> <input class=\"form-control\"placeholder=\"Enter Number of Servings:\"> </td>" +
      "<td class=\"fw-bold calorie\">" + fCalories + "</td>" +
      "</tr>");
    // todayTotalCalories+= parseInt($(".calorie").text())
    // alert(todayTotalCalories)

    let todayTotalCalories = 0
    for (let i = 1; i < table.rows.length; i++) {
      todayTotalCalories = todayTotalCalories + parseInt(table.rows[i].cells[3].innerHTML)
    }
    $("#totalCalories").text(todayTotalCalories)
  }


})



// "id=\""+count+"\""

// search("Bigbiitoased");
