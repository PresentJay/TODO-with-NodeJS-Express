// this jquery function called when document is loaded.
// it shows TODO items-list from JSON file.
$(document).ready(function () {
  var arrange_list = function () {
    $.ajax("/arrange", {
      method: "POST",
      success: function (list) {},
    });
  };

  var get_list = function () {
    arrange_list();

    $.ajax("/list", {
      success: function (list) {
        var trs = "";

        list = JSON.parse(list).list;

        // make table from list
        for (var i = 0, len = list.length; i < len; i++) {
          trs +=
            "<tr>" +
            "<td>" +
            (i + 1) +
            "</td>" +
            '<td class="' +
            (list[i].complete ? "complete" : "") +
            '">' +
            list[i].contents +
            "</td>" +
            '<td><button type="button" class="btn btn-success">완료</button></td>' +
            '<td><button type="button" class="btn btn-danger">삭제</button></td>' +
            "</tr>";
        }

        // inject table(trs) to tbody
        $("tbody").html(trs);
      },
    });
  };

  get_list();

  $(".form-control").keydown(function (key) {
    if (key.keyCode == 13) {
      $(".form-inline button").click();
      key.preventDefault();
      self.focus();
    }
  });

  // when add button is clicked (POST method)
  $(".form-inline button").click(function () {
    $.ajax("/add", {
      method: "POST",
      data: {
        contents: $("#new_todo").val(),
      },
      success: get_list,
    });

    $("#new_todo").val("").focus();
  });

  // when complete button is clicked (POST method)
  $("tbody").on("click", ".btn-success", function () {
    $.ajax("/complete", {
      method: "POST",
      data: {
        index: parseInt($(this).parent().siblings(":first").text()) - 1,
      },
      success: get_list,
    });
  });

  // when delete button is clicked (POST method)
  $("tbody").on("click", ".btn-danger", function () {
    $.ajax("/del", {
      method: "POST",
      data: {
        index: parseInt($(this).parent().siblings(":first").text()) - 1,
      },
      success: get_list,
    });
  });
});
