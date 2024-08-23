import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AdminDashboard from '../Pages/Admin';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the axios module
jest.mock('axios');

describe('AdminDashboard', () => {
  beforeEach(() => {
    // Mock axios.get to return the mock data
   

    // Render component with Router wrapper
    render(
      <Router>
        <AdminDashboard />
      </Router>
    );
  });

  test('renders table headers correctly', () => {
    // Check table headers
    // expect(screen.getByRole('Auction ID')).toBeInTheDocument();
    // expect(screen.getByRole('Product Name')).toBeInTheDocument();
    // expect(screen.getByRole('Starting Price')).toBeInTheDocument();
    // expect(screen.getByRole('Current Highest Bid')).toBeInTheDocument();
    // expect(screen.getByRole('End Date')).toBeInTheDocument();
    // expect(screen.getByRole('Status')).toBeInTheDocument();
    expect(screen.getByRole('header')).toBeInTheDocument();
  });

 
  test('renders table',()=>{
    expect(screen.getByRole('tables')).toBeInTheDocument();
  });

  test('renders button',()=>{
    expect(screen.getByRole('End')).toBeInTheDocument();
  });
//   test('renders AdminNav and AdminWinnings components', () => {
//     // Check that AdminNav component is rendered
//     expect(screen.getByRole('navigation')).toBeInTheDocument();

//     // Check that AdminWinnings component is rendered
//     expect(screen.getByText(/Admin Winnings/i)).toBeInTheDocument();
//   });

//   test('renders End buttons for each auction', async () => {
//     // Wait for the End buttons to appear
//     await waitFor(() => {
//       const buttons = screen.getByRole('End');
//       expect(buttons).toHaveLength(2); // Expect two End buttons for two auctions
//     });
//   });
});
