// RegisterForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Signup from '../Signup'
import MockAdapter from 'axios-mock-adapter';


const mock = new MockAdapter(axios);
jest.mock('axios');
jest.mock('react-router-dom');
describe('RegisterForm Component', () => {
  beforeEach(() => {
    
    mock.reset();
  });
  

  
it("renders 'Signup header text' ", () => {
    render(<Signup />);
    const linkElement = screen.getByRole("heading");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Register");
    
   
  });

  test('renders form label for  all fields ', async () => {
    // Mock successful POST request
    // mock.onPost('http://localhost:8000/users').reply(200);

    render(<Signup />);

    // Check that the form fields are rendered
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();

   

    // Wait for the form submission to complete
    // await waitFor(() => {
    //   expect(screen.getByText('User registered successfully')).toBeInTheDocument();
    // });
  });


  test('renders user  form fields and Button ', async () => {
    // Mock successful POST request
    // mock.onPost('http://localhost:8000/users').reply(200);

    render(<Signup />);

   
    // Fill out the form
    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Email/i), 'testuser@example.com');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');
    userEvent.type(screen.getByLabelText(/Contact/i), '+1234567890');
    userEvent.type(screen.getByLabelText(/Address/i), '123 Test Street');

    // Click the submit button
    screen.getByRole('button', { name: /Register/i });

    // Wait for the form submission to complete
    // await waitFor(() => {
    //   expect(screen.getByText('User registered successfully')).toBeInTheDocument();
    // });
  });




  test('shows validation errors for invalid inputs', async () => {
    render(<Signup />);

    // Click the submit button without filling in the form
    userEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check for validation errors
    expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Contact is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Address is required/i)).toBeInTheDocument();

  });

//   test('shows specific validation error messages', async () => {
//     render(<Signup />);

//     // Fill in invalid email and contact fields
//     userEvent.type(screen.getByLabelText(/Email/i), 'invalid-email');
//     userEvent.type(screen.getByLabelText(/Contact/i), '123');

//     // Click the submit button
//     userEvent.click(screen.getByRole('button', { name: /Register/i }));

//     // Check for specific validation errors
//     expect(await screen.findByText(/Email must contain only lowercase letters and numbers/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Contact number must be a valid phone number/i)).toBeInTheDocument();
//   });

//   test('handles server errors on form submission', async () => {
//     // Mock failed POST request
//     mock.onPost('http://localhost:8000/users').reply(500);

//     render(<Signup />);

//     // Fill out the form
//     userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
//     userEvent.type(screen.getByLabelText(/Email/i), 'testuser@example.com');
//     userEvent.type(screen.getByLabelText(/Password/i), 'password123');
//     userEvent.type(screen.getByLabelText(/Contact/i), '+1234567890');
//     userEvent.type(screen.getByLabelText(/Address/i), '123 Test Street');

//     // Click the submit button
//     userEvent.click(screen.getByRole('button', { name: /Register/i }));

//     // Wait for error handling
//     await waitFor(() => {
//       expect(screen.queryByText('User registered successfully')).not.toBeInTheDocument();
//       // Here you would check for error handling if implemented in your component
//     });
//   });
});
