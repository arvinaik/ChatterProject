$("#chitText_textbox").click(function() {
  $(this).css("height", "150px");
});

$.getJSON("/allTweets.json", function(data) {
  $.each(data, function(key, val) {
    const ppsmol = JSON.parse(val);
    if (ppsmol.length <= 5) {
      $("#ChitLoader").hide();
    }

    for (let index = 0; index < 5; index++) {
      const element = ppsmol[index];
      console.log(element);
      const newChit =
        '<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' +
        element.userName +
        '</h5><p class="card-text">' +
        element.content +
        "</p></div></div>";

      $(newChit).insertBefore("#ChitLoader");
    }

    let chitCount = 5;
    $("#ChitLoader").click(function() {
      console.log(chitCount);
      console.log(ppsmol.length);
      if (chitCount >= ppsmol.length - 5) {
        $(this).hide();
      }
      for (let index = chitCount; index < chitCount + 5; index++) {
        const element = ppsmol[index];
        const newChit =
          '<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' +
          element.userName +
          '</h5><p class="card-text">' +
          element.content +
          "</p></div></div>";

        $(newChit).insertBefore("#ChitLoader");
      }
      chitCount += 5;
    });
  });
});
