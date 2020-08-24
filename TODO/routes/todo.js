/* 
    GET TODO
 */

// this module handles fileSystem
var fs = require('fs');

// get TODO LIST
exports.list = function (req, res) {
    // check presence of TODO-LIST Json file
    fs.exists('./todo_list.json', function (exists) {
        if (exists) {
            // if it exists, read json file(get data)
            fs.readFile('./todo_list.json', {
                'encoding': 'utf8' // encoding this json context
            }, function (err, list) { // handle errors
                res.json(list);
            });
        } else {
            // if it not exists, create new json file
            var list = {
                'list': []
            };

            // create file function(json)
            fs.writeFile(
                './todo_list.json', // file name
                JSON.stringify(list), // stringify is JS to JSON method
                function (err) { // handle errors
                    res.json(list);
                }
            );
        }
    });
};

// add new TODO item to LIST
exports.add = function (req, res) {
    var todo = {
        // basic TODO item structure
        'contents': '',
        'complete': false
    };

    // set new item's contents
    todo.contents = req.body.contents;

    // get old json file, and update it
    fs.readFile(
        './todo_list.json', {
            'encoding': 'utf8'
        },
        function (err, data) {
            // parse is JSON to JS method
            data = JSON.parse(data);

            // add items to end of list
            data.list.push(todo);

            // update json file
            fs.writeFile(
                './todo_list.json',
                JSON.stringify(data),
                function (err) {
                    res.json(true);
                }
            );
        })
}