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

    // set new item's content
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
        }
    );
};

// complete TODO item that is selected
exports.complete = function (req, res) {
    // get old json file
    fs.readFile(
        './todo_list.json', {
            'encoding': 'utf8'
        },
        function (err, data) {
            // get data from json file(old)
            data = JSON.parse(data);

            // select items from list(with index - that indicates selection), and change attribute(convert complete boolean)
            data.list[req.body.index].complete = true;

            // update json file
            fs.writeFile(
                './todo_list.json',
                JSON.stringify(data),
                function (err) {
                    res.json(true);
                }
            );
        }
    )
}

// delete TODO item that is selected
exports.del = function (req, res) {
    // get old json file
    fs.readFile(
        './todo_list.json', {
            'encoding': 'utf8'
        },
        function (err, data) {
            // get data from json file(old)
            data = JSON.parse(data);

            // make seleted item null (delete)
            data.list[req.body.index] = null;

            // list validation (except null item)
            data.list = data.list.filter(Boolean);

            // update json file
            fs.writeFile(
                './todo_list.json',
                JSON.stringify(data),
                function (err) {
                    res.json(true);
                }
            )
        }
    )
}

// arrange TODO list from uncompleted items to completed items
exports.arrange = function (req, res) {
    // check presence of TODO-LIST Json file
    fs.exists('./todo_list.json', function (exists) {

        // get old json file
        fs.readFile(
            './todo_list.json', {
                'encoding': "utf8"
            },
            function (err, data) {
                data = JSON.parse(data);

                const oldlist = data.list;
                const uncompleted = oldlist.filter(function (obj) {
                    return obj['complete'] === false;
                });
                const completed = oldlist.filter(function (obj) {
                    return obj['complete'] === true;
                });

                data.list = uncompleted;
                for (item of completed) data.list.push(item);

                // update json file
                fs.writeFile(
                    './todo_list.json',
                    JSON.stringify(data),
                    function (err) {
                        res.json(true);
                    }
                )
            }
        )
    });

}