import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
import AdminWinnings from '../Pages/Winnings';
describe('AdminWinnings Component', () => {
  beforeEach(() => {
   
    render(<AdminWinnings />);
  });

  test('renders page heading correctly', () => {
   
    const heading = screen.getByText(/Auction Winners/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
   
    const headers = [
      'Winner ID',
      'Auction ID',
      'Product Name',
      'Winning Bid Amount',
      'Winner',
      'Product Image'
    ];

    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders table with correct number of columns', () => {
    // Check the number of columns in the table header
    const columns = screen.getAllByRole('columnheader');
    expect(columns).toHaveLength(6); // 6 columns as per the headers
  });

  test('renders empty table message when no winnings are present', () => {
    // Check for the presence of the "No winnings found" message
    const noWinningsMessage = screen.getByText(/No winnings found/i);
    expect(noWinningsMessage).toBeInTheDocument();
  });

  
});
