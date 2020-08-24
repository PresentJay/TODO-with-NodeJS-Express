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
                JSON.stringify(list), // stringify is js to JSON method
                function (err) { // handle errors
                    res.json(list);
                }
            );
        }
    });
};