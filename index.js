
var http = require('http');
let users = require("./state").users;
// let products = require("./state").products;


let server = http.createServer(messageReceived);

server.listen(3030);

function messageReceived(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if(req.method === "GET" && req.url === ("/users")){
        let usersJSON = JSON.stringify(users);
        res.write(usersJSON);
    }
    else if(req.method === "GET" && req.url.indexOf("/users") > -1 ){
        let id = req.url.split("/");
        let user = users.find(p=>p["_id"] == id[2]);
        let userJSON = JSON.stringify(user);
        res.write(userJSON);
    }
    else if(req.method === "POST" && req.url === "/users"){
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                let user = JSON.parse(body);
                users.push(user);
                users[users.length -1]["_id"] = users.length;
            });
        }
    else if(req.method === "PUT" && req.url.indexOf("/users/") > -1 ){
        let body = [];
        let id = req.url.split('/');
        let user = users.find(p=>p["_id"] == id[2]);
        req.on('data', (chunk)=>{
            body.push(chunk);
        }).on('end', ()=>{
            //let idNum = users.length - 1;
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            //body = users[idNum];
        });
     }
    // else if(req.method === "DELETE" && req.url === "/users"){
    //     res.write("you wanted to delete a product");
    // }
    else {
        res.write("Not Found");
    }
    res.end();
}


