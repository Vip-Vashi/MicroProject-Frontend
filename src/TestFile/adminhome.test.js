// AdminNav.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminNav from '../Components/AdminNav'; 


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/AdminDashboard',
  }),
}));

describe('AdminNav Component', () => {
  test('renders navigation links correctly', () => {
    render(
      <Router>
        <AdminNav />
      </Router>
    );

    // Check if the navigation links are rendered
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Auctions/i)).toBeInTheDocument();
    expect(screen.getByText(/LogOut/i)).toBeInTheDocument();
  });

  test('applies the active class correctly', () => {
    render(
      <Router>
        <AdminNav />
      </Router>
    );

    // Verify the active link has the correct class
    expect(screen.getByText(/Admin Dashboard/i)).toHaveClass('text-2xl font-bold text-cyan-400 font-bold', { exact: true });
    expect(screen.getByText(/Admin Dashboard/i)).toHaveClass('text-2xl font-bold text-cyan-400 font-bold', { exact: true });
    
    
    
    // Verify other links do not have the active class
    expect(screen.getByText(/Products/i)).not.toHaveClass('text-cyan-400');
    expect(screen.getByText(/Auctions/i)).not.toHaveClass('text-cyan-400');
  });

  test('logout button clears sessionStorage and navigates to home', () => {
    // Mock the sessionStorage.clear function
    const clearMock = jest.fn();
    Object.defineProperty(window, 'sessionStorage', {
      value: { clear: clearMock },
      writable: true,
    });

    render(
      <Router>
        <AdminNav />
      </Router>
    );

    // Simulate a button click
    fireEvent.click(screen.getByText(/LogOut/i));

    // Check if sessionStorage.clear() was called
    expect(clearMock).toHaveBeenCalled();

    // Ensure the navigation goes to home (by checking if the link is present)
    expect(screen.getByText(/LogOut/i)).toHaveAttribute('href', '/');
  });
});
