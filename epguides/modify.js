(function() {
  $(".NoPrint").remove();
  $("#docTop").remove();
  $("#credits").remove();
  $("#blurb").remove();
  $("#notes").remove();
  $("#amazon").remove();
  $("#homenote").remove();
  $("#footer").remove();
  $("#disclaimer").remove();
  $("#terms").remove();
  $("#copyright").remove();
  $("#shadowMeasureIt").remove();
  $("#divCoordMeasureIt").remove();
  $("#divRectangleMeasureIt").remove();
  $("p").remove();
  $("hr").remove();
  $(".recap").remove();
  $(".Trailers").remove();
  $('#header').replaceWith("<h1>"+$("h1").html()+"</h1>");
  $('a').each(function(i, e) {
    $(e).replaceWith($(e).html());
  });

  var seriesTitleChangeMap = {
    "House, M.D.": "House MD",
    "How I Met Your Mother": "HIMYM",
    "The Big Bang Theory": "Big Bang Theory",
    "The Office (US)": "The Office"
  };

  var seriesTitle = seriesTitleChangeMap[$("h1").html()]?seriesTitleChangeMap[$("h1").html()]:$("h1").html();
  
  var rows = $("pre").html().split("\n");
  var newPre = "";
  $(rows).each(function(i,r) {
    if(r.split(" ") [0] && !isNaN(r.split(" ") [0])) {
      var num = r.substr(3,9).replace(/\s/g, "").split("-"); 
      var episodeNo = " - s" + (num[0].length===1?"0":"") + num[0] + "e" + num[1] + " - ";
      var episodeTitle = r.trim().split("   ");
      episodeTitle = episodeTitle[episodeTitle.length-1].trim();
      r += "                                                                     ";
      r = r.replace("&amp;", "&");
      r = r.substr(0,57) +  "\t" + seriesTitle + episodeNo + episodeTitle;
      newPre += "<div style='padding:5px 0;'>"+r + "</div>";
    } else if (r[0] === "•") {
      newPre += "</div><div class='season'><div style='padding:5px 0;'>"+r + "</div>";
      
    } else if (r.substr(0,5) === "Other") {
      newPre += "</div><div class='other'><div style='padding:5px 0;'>"+r + "</div>";
    } else {
      newPre += "<div style='padding:5px 0;'>"+r + "</div>";
    }

  });
  $("pre").html(+"<div>" + newPre + "<div>");
  var reversedList = "";
  $(jQuery.makeArray($(".season")).reverse()).each(function(i, e) {
    reversedList += $(e).html();
  });
  var other = "";
  if($(".other").length) {
    var other = "<div class='other'>" + $(".other").html() + "</div>";
  }
  $(".season").remove();
  $(".other").remove();

  $("pre").html(reversedList + other);
  
}) ();
