var currentTime = moment().format("h a");
var dispTime = moment("8 am", "h a").format("h a");
var calValue;

localStorage.setItem("day", moment().format("MM/DD/YYYY"));

//Main Function to render the HTML
$(document).ready(function () {
  $("#currentDay").append(moment().format("dddd, MM/DD/YYYY, h:mm A"));

  for (var i = 1; i < 12; i++) {
    var timeDisp = $("<p>");
    var dayTimeText = $("<textarea>");
    var dayTimeBtn = $("<button>");

    //for displaying the time of day
    timeDisp.addClass("hour col-sm-2");
    timeDisp.append(dispTime);

    //if Time is before compared to now then class is set to past to show gray background
    if (moment(dispTime, "h a").isBefore(moment(currentTime, "h a"))) {
      dayTimeText.addClass("row textarea past col-sm-9");
    } 
    //if time is equal to now then class is set to current to show in pink background
    else if (moment(dispTime, "h a").isSame(moment(currentTime, "h a"))) {
      dayTimeText.addClass("row textarea present col-sm-9");
    }
    //if Time is later than now then class is set to future to show in green background
    else if (moment(dispTime, "h a").isAfter(moment(currentTime, "h a"))) {
      dayTimeText.addClass("row textarea future col-sm-9");
    }

    //for rendering the text boxes for each hour and also retrieving local storage values
    dayTimeText.attr("id", "text_area" + i);
    //dayTimeText.val;
    
    var tempText = localStorage.getItem("#text_area" + i);
    
    if (localStorage.getItem("day") === moment().format("MM/DD/YYYY")) {
        dayTimeText.val(tempText);
        console.log("inside if loop");
    }
    else {
        localStorage.removeItem("#text_area" + i);
        console.log("inside else loop");
    }

    dayTimeText.val(tempText);

    //for rendering the save buttons using Google Font Awesome (fa)
    dayTimeBtn.addClass("saveBtn col-sm-1 fas fa-save");
    dayTimeBtn.attr("value", "area" + i);

    //Putting all HTML components together
    $("#time-planner").append(timeDisp, dayTimeText, dayTimeBtn, "<br>");

    //hour increment for each hour
    dispTime = moment(dispTime, "h a").add(1, "hours").format("h a");
  }

  //logic for saving content of each hour when save button is clicked
  $("button").on("click", function () {
    calValue = $(this).val();
    var text = $("#text_" + calValue).val();
    localStorage.setItem("#text_" + calValue, text);
  });
});
