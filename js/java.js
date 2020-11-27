/*
 Name: Tony Dam
 Email: tony_dam@student.uml.edu
 Affiliation: Junior Student at UMass Lowell in COMP.4610-201
              91.61 GUI Programming I
Date created: 11/23/20

Sources from: W3Schools, Stackoverflow, Youtube, JSFiddle
and https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient

Website was created for personal use. Creates a dynamic interactive
table for users to generate a multiplication table of any length of
their choosing.
Copyright (c) November 23rd, 2020 Tony Dam. All rights reserved.
May be freely copied or excerpted for educational purposes with credit to
author.
*/

var error = '';
$(document).ready(function() {
  $("#inputs").validate({
    errorClass: 'errmsg',
    wrapper: "div",
    rules: {
      input3: {
        required: true,
        number: true,
        range: [-100, 99]
      },
      input4: {
        required: true,
        number: true,
        range: [-99, 100]
      },
      input1: {
        required: true,
        number: true,
        range: [-100, 99]
      },
      input2: {
        required: true,
        number: true,
        range: [-99, 100]
      }
    },
    messages: {
      minRowVal: {
        required: '    Please enter a number from -100 to 99'
      },
      maxRowVal: {
        required: '    Please enter a number from -99 to 100'
      },
      minColVal: {
        required: '    Please enter a number from -100 to 99'
      },
      maxColVal: {
        required: '    Please enter a number from -99 to 100'
      },
    submitHandler: function(form) {
      form.submit();
    }
  }
  });
});

$("#input1").val(2);
$("#input2").val(0);
$("#input3").val(4);
$("#input4").val(8);

var input1 = document.querySelector('#input1');
var input2 = document.querySelector('#input2');
var input3 = document.querySelector('#input3');
var input4 = document.querySelector('#input4');

/*---------Changes table based on text input -----*/
input1.addEventListener('input', function()
{
    table();
});
input2.addEventListener('input', function()
{
    table();
});
input3.addEventListener('input', function()
{
    table();
});
input4.addEventListener('input', function()
{
    table();
});

/*-----------------------SLIDERS-------------------*/
/* slider for min column value */
var slider_min_col_Opts = {
  disabled: false,
  range:    false,
  values:   null ,
  min:      -100  ,
  max:       100  ,
  slide: function() {
      $("#input1").val($("#slider_min_col").slider("value"));
      table();
  },
};

(function($){ 
  $("#slider_min_col").slider(slider_min_col_Opts);
})(jQuery);


/* slider for max column value */
var slider_max_col_Opts = {
  disabled: false,
  range:    false,
  values:   null ,
  min:      -100  ,
  max:       100  ,
  slide: function() {
      $("#input2").val($("#slider_max_col").slider("value"));
      table();
  }
};

(function($){ 
  $("#slider_max_col").slider(slider_max_col_Opts);
})(jQuery);

/* slider for min row value */
var slider_min_row_Opts = {
  disabled: false,
  range:    false,
  values:   null ,
  min:      -100  ,
  max:       100  ,
  slide: function() {
      $("#input3").val($("#slider_min_row").slider("value"));
      table();
  }
};

(function($){ 
  $("#slider_min_row").slider(slider_min_row_Opts);
})(jQuery);

/* slider for max row value */
var slider_max_row_Opts = {
  disabled: false,
  range:    false,
  values:   null ,
  min:      -100  ,
  max:       100  ,
  slide: function() {
      $("#input4").val($("#slider_max_row").slider("value"));
      table();
  }
};

(function($){ 
  $("#slider_max_row").slider(slider_max_row_Opts);
})(jQuery);

/*----------------Generate Table---------------*/

function table() {
$("#inputs").submit(function(e) {
  e.preventDefault();
});
var error = '';
var minCol = +document.getElementById("input1").value;
var maxCol = +document.getElementById("input2").value;
var minRow = +document.getElementById("input3").value;
var maxRow = +document.getElementById("input4").value;
var counter = 0;
var rows = '';
//var columns = '<td>';

/*Checks if there is more than one empty input */
if ($('#input1').val() == '' || $('#input2').val() == '' 
    || $('#input3').val() == '' || $('#input4').val() == '')
{
  rows = '';
  document.getElementById("multiTable").innerHTML = rows; //empty table
  return false;
}
//checks for digits
if ( isNaN(minRow) || isNaN(maxRow) || isNaN(minCol) || isNaN(maxCol) ) {
  rows = '';
  document.getElementById("multiTable").innerHTML = rows; //empty table
  return false;
}

// checks if user entered a greater max column than min column input
if (minCol > maxCol)
{
  counter += 1; //used for formatting between two errors
  error += "(!) Swapped column's min and max values";
  minCol = maxCol; //makes min = to max
  maxCol = +document.getElementById("input1").value; //makes max = to min
}
// checks if user entered a greater max row than min row input
if (minRow > maxRow)
{
  //counter is used to format whether if the previous if statement was
  //used
  if (counter >= 1) { //uses line break if previous if was used
  error += "</br>(!) Swapped row's min and max values";
  }
  else { //no line break if previous if wasn't used
      error += "(!) Swapped row's min and max values";
  }
  minRow = maxRow; //makes minRow = to max
  maxRow =  +document.getElementById("input3").value; //max row is = to min
}

//prints errors that were found
document.getElementById("Updates").innerHTML = error;

//checks if user has inputs
if ((minCol == 0) || !(maxCol == 0) || !(minRow == 0) || !(maxRow == 0) 
    && !(minCol == "") || !(maxCol == "") || !(minRow == "") || !(maxRow == "")) {
  rows += '<td>' + '' + '</td>'; //empty top left grid box

  //creates first row of numbers
  for (var i = minRow; i <= maxRow; i++){
    rows += '<td>' + i + '</td>';
  }
  rows += '</tr>';

  //creates first column of numbers
  for(var i= minCol; i <= maxCol; i++){
    rows += '<tr>';
    rows += '<td>' + i + '</td>';

    // the multiplication between the numbers
  for(var j = minRow; j <= maxRow; j++){
      rows += '<td>' + i*j + '</td>';
    }
    rows += '</tr>';
  }
  //outputs table
  document.getElementById("multiTable").innerHTML = rows;
}

}
function deleteSelectedTabs() {
  rows = '';
  document.getElementById("multiTable").innerHTML = rows;
  error = '';
  document.getElementById("Updates").innerHTML = error;
}

