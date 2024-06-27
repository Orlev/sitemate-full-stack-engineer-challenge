const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define the path to the issues.json file
const issuesFilePath = path.resolve(__dirname, 'issues.json');

// Load issues from issues.json file
let issues = [];
if (fs.existsSync(issuesFilePath)) {
    issues = JSON.parse(fs.readFileSync(issuesFilePath, 'utf8'));
}

app.get('/issues', (req, res) => {
    res.json(issues);
});

app.post('/issues', (req, res) => {
    const newIssue = req.body;
    issues.push(newIssue);
    fs.writeFileSync(issuesFilePath, JSON.stringify(issues, null, 2));
    console.log('Created:', newIssue);
    res.status(201).send(newIssue);
});

app.put('/issues/:id', (req, res) => {
    const { id } = req.params;
    const updatedIssue = req.body;
    issues = issues.map(issue => issue.id == id ? updatedIssue : issue);
    fs.writeFileSync(issuesFilePath, JSON.stringify(issues, null, 2));
    console.log('Updated:', updatedIssue);
    res.send(updatedIssue);
});

app.delete('/issues/:id', (req, res) => {
    const { id } = req.params;
    issues = issues.filter(issue => issue.id != id);
    fs.writeFileSync(issuesFilePath, JSON.stringify(issues, null, 2));
    console.log('Deleted issue with id:', id);
    res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
