const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

let issues = require('../issues.json');

app.get('/issues', (req, res) => {
    res.json(issues);
});

app.post('/issues', (req, res) => {
    const newIssue = req.body;
    issues.push(newIssue);
    fs.writeFileSync(path.resolve(__dirname, '../issues.json'), JSON.stringify(issues, null, 2));
    res.status(201).send(newIssue);
});

app.put('/issues/:id', (req, res) => {
    const { id } = req.params;
    const updatedIssue = req.body;
    issues = issues.map(issue => issue.id == id ? updatedIssue : issue);
    fs.writeFileSync(path.resolve(__dirname, '../issues.json'), JSON.stringify(issues, null, 2));
    res.send(updatedIssue);
});

app.delete('/issues/:id', (req, res) => {
    const { id } = req.params;
    issues = issues.filter(issue => issue.id != id);
    fs.writeFileSync(path.resolve(__dirname, '../issues.json'), JSON.stringify(issues, null, 2));
    res.status(204).send();
});

describe('Issues API', () => {
    beforeEach(() => {
        // Reset issues to initial state before each test
        issues = [
            { id: 1, title: 'Issue 1', description: 'Description of issue 1' },
            { id: 2, title: 'Issue 2', description: 'Description of issue 2' }
        ];
        fs.writeFileSync(path.resolve(__dirname, '../issues.json'), JSON.stringify(issues, null, 2));
    });

    it('GET /issues should return all issues', async () => {
        const res = await request(app).get('/issues');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(issues);
    });

    it('POST /issues should create a new issue', async () => {
        const newIssue = { id: 3, title: 'Issue 3', description: 'Description of issue 3' };
        const res = await request(app).post('/issues').send(newIssue);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(newIssue);

        const getRes = await request(app).get('/issues');
        expect(getRes.body.length).toBe(3);
        expect(getRes.body).toContainEqual(newIssue);
    });

    it('PUT /issues/:id should update an issue', async () => {
        const updatedIssue = { id: 1, title: 'Updated Issue 1', description: 'Updated description of issue 1' };
        const res = await request(app).put('/issues/1').send(updatedIssue);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(updatedIssue);

        const getRes = await request(app).get('/issues');
        expect(getRes.body).toContainEqual(updatedIssue);
    });

    it('DELETE /issues/:id should delete an issue', async () => {
        const res = await request(app).delete('/issues/1');
        expect(res.statusCode).toEqual(204);

        const getRes = await request(app).get('/issues');
        expect(getRes.body.length).toBe(1);
        expect(getRes.body).not.toContainEqual({ id: 1, title: 'Issue 1', description: 'Description of issue 1' });
    });
});
