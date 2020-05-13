const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

let users = [];

server.get("/", (req, res) => {
    res.json({message: "hey there"});
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);

    const missingName = users.find(user => user.name !== name);
    const missingBio = users.find(user => user.bio !== bio);

    userInfo.id=shortid.generate();
    users.push(userInfo);

    res.status(201).json(userInfo);
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })

    if(missingName) {
        res.status(404).json({errorMessage: "Please provide name and bio for the user." })
    }
    if(missingBio) {
        res.status(404).json({errorMessage: "Please provide name and bio for the user." })
    }
    
    
})

server.get('/api/users', (req, res) => {
    res.status(200).json(users);
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    const foundUser = users.find(user => user.id === id);

    if (foundUser) {
        res.status(200).json(foundUser);
    }  else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    
    const found = users.find(user => user.id === id);

    if(found) {
        users = users.filter(user => user.id !==id);
        res.status(200).json(found);
    } else {
        res.status(404).json({message:"not found"});
    }
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    let index = users.findIndex(user => user.id === id);
    // const missName = users.find(user => user.name !== name);
    // const missBio = users.find(user => user.bio !== bio);

    if (index !== -1) {
        changes.id = id;
        users[index] = changes;
        res.status(200).json(users[index])
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }

    // if(missName) {
    //     res.status(404).json({errorMessage: "Please provide name and bio for the user." })
    // }
    // if(missBio) {
    //     res.status(404).json({errorMessage: "Please provide name and bio for the user." })
    // }
})

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})