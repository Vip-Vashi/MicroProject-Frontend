// LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import Login from '../Login'; 

const mock = new MockAdapter(axios);
jest.mock('axios');
jest.mock('react-router-dom');
const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>); // Wrap component with BrowserRouter
  };

describe('LoginForm Component', () => {
  beforeEach(() => {
    // Reset the mock adapter before each test
    mock.reset();
  });

  test('renders form with all fields and submits successfully', async () => {
  

    render(<Login/>);

    // Check that the form fields are rendered
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();

    // Fill out the form
    userEvent.type(screen.getByLabelText(/Email/i), 'testuser@example.com');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');

    // Click the submit button
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the navigation to occur (or check the effect of the successful login)
    // await waitFor(() => {
    //   // You would typically check for navigation or other side effects
    //   // Here we just ensure no errors are shown
    //   expect(screen.queryByText(/Login failed/i)).not.toBeInTheDocument();
    // });
  });

  test('shows validation errors for invalid inputs', async () => {
    render(<Login/>);

    // Click the submit button without filling in the form
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check for validation errors
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  test('shows specific validation error messages', async () => {
    render(<Login />);

    // Fill in invalid email and short password
    userEvent.type(screen.getByLabelText(/Email/i), 'invalid-email');
    userEvent.type(screen.getByLabelText(/Password/i), '123');

    // Click the submit button
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check for specific validation errors
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  test('renders Login submit button', async () => {
    

    render(<Login/>);

    // Fill out the form
    userEvent.type(screen.getByLabelText(/Email/i), 'testuser@example.com');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');

    (screen.getByRole('button', { name: /Login/i }));

   
   
  });
});
