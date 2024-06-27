import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';

const mock = new MockAdapter(axios);

const issues = [
    { id: 1, title: 'Issue 1', description: 'Description of issue 1' },
    { id: 2, title: 'Issue 2', description: 'Description of issue 2' }
];

beforeEach(() => {
    mock.reset();
});

test('renders issues and allows CRUD operations', async () => {
    mock.onGet('http://localhost:3001/issues').reply(200, issues);

    render(<App />);

    // Check that issues are rendered
    await waitFor(() => screen.getByText('Issue 1'));
    expect(screen.getByText('Issue 1')).toBeInTheDocument();
    expect(screen.getByText('Issue 2')).toBeInTheDocument();

    // Create a new issue
    fireEvent.change(screen.getByPlaceholderText(/enter id/i), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText(/enter title/i), { target: { value: 'Issue 3' } });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), { target: { value: 'Description of issue 3' } });

    mock.onPost('http://localhost:3001/issues').reply(201, {
        id: 3,
        title: 'Issue 3',
        description: 'Description of issue 3'
    });

    fireEvent.click(screen.getByText(/create issue/i));

    await waitFor(() => screen.getByText('Issue 3'));
    expect(screen.getByText('Issue 3')).toBeInTheDocument();

    // Update an issue
    fireEvent.click(screen.getAllByText(/edit/i)[0]);
    fireEvent.change(screen.getByPlaceholderText(/enter title/i), { target: { value: 'Updated Issue 1' } });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), { target: { value: 'Updated description of issue 1' } });

    mock.onPut('http://localhost:3001/issues/1').reply(200, {
        id: 1,
        title: 'Updated Issue 1',
        description: 'Updated description of issue 1'
    });

    fireEvent.click(screen.getByText(/update issue/i));

    await waitFor(() => screen.getByText('Updated Issue 1'));
    expect(screen.getByText('Updated Issue 1')).toBeInTheDocument();

    // Delete an issue
    mock.onDelete('http://localhost:3001/issues/1').reply(204);

    fireEvent.click(screen.getAllByText(/delete/i)[0]);

    await waitFor(() => {
        expect(screen.queryByText('Updated Issue 1')).not.toBeInTheDocument();
    });
});
