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
  $('#header').replaceWith("<h1><span id='serial'>"+$("h1").html()+"</span><button id='removeJunk' href='javascript:void(0);'>Show as list of names</button></h1>");
  $('a').each(function(i, e) {
    $(e).replaceWith($(e).html());
  });

  var seriesTitleChangeMap = {
    "House, M.D.": "House MD",
    "How I Met Your Mother": "HIMYM",
    "The Office (US)": "The Office"
  };

  var seriesTitle = seriesTitleChangeMap[$("#serial").html()]?seriesTitleChangeMap[$("#serial").html()]:$("#serial").html();
  
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
      var name = seriesTitle + episodeNo + episodeTitle;
      r = "<span class='junk'>" + r.substr(0,57) +  "\t</span><span><span class='copy'>" + name + "</span></span>";
      newPre += "<div style='padding:5px 0;'>" + r + "</div>";
    } else if (r[0] === "•") {
      newPre += "</div><div class='season'><div style='padding:5px 0;'>"+ r + "</div>";
      
    } else if (r.substr(0,5) === "Other") {
      newPre += "</div><div class='other'><div style='padding:5px 0;'>"+ r + "</div>";
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

  $(document.body).click(function(event) {
    if($(event.target).hasClass("copy")) {
      var text = $(event.target).html();
      var parent = $(event.target).parent();
      $(event.target).replaceWith("<input class='copyInput'  type='text' />");
      parent.children() [0].value = text;
      parent.children() [0].select();
    } else if ($(event.target).hasClass("copyInput")) {
      event.target.select();
    }
  });

  $("#removeJunk").click(function(event) {
    event.preventDefault();
    $(".junk").remove();
  });
  
}) ();
