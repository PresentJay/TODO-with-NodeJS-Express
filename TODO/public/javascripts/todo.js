// this jquery function called when document is loaded.
// it shows TODO items-list from JSON file.
$(document).ready(function () {
    $.ajax('/list', {
        'success': function (list) {
            var trs = '';

            // get old list
            list = JSON.parse(list).list;

            // make table from list
            for (var i = 0, len = list.length; i < len; i++) {
                trs += '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + list[i].contents + '</td>' +
                    '<td><button type="button" class="btn btn-success">완료</button></td>' +
                    '<td><button type="button" class="btn btn-danger>삭제</button></td>' +
                    '</tr>';
            }

            // inject table(trs) to tbody
            $('tbody').html(trs);
        }
    })
})