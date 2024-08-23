import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BidHistory from '../Pages/Bidhistory';

// Mock sessionStorage


describe('BidHistory', () => {
    test('renders table and headers correctly', () => {
        render(<BidHistory />);

        // Check if the table headers are rendered correctly
        expect(screen.getByText('Product ID')).toBeInTheDocument();
        expect(screen.getByText('Product Name')).toBeInTheDocument();
        expect(screen.getByText('Bid Price')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    // test('renders bid rows correctly when there are bids', () => {
    //     render(<BidHistory />);

    //     // Check if the bids are rendered in the table
    //     expect(screen.getByText('1')).toBeInTheDocument();
    //     expect(screen.getByText('Product A')).toBeInTheDocument();
    //     expect(screen.getByText('$50')).toBeInTheDocument();
    //     expect(screen.getByText('Winning')).toBeInTheDocument();

    //     expect(screen.getByText('2')).toBeInTheDocument();
    //     expect(screen.getByText('Product B')).toBeInTheDocument();
    //     expect(screen.getByText('$75')).toBeInTheDocument();
    //     expect(screen.getByText('Losing')).toBeInTheDocument();
    // });

    test('renders "No bids placed yet" message when no bids are present', () => {
        sessionStorage.setItem('bids', JSON.stringify([]));
        render(<BidHistory />);

        // Check if the "No bids placed yet" message is displayed
        expect(screen.getByText('No bids placed yet')).toBeInTheDocument();
    });
});
