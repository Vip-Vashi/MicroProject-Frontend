import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UPIModal from '../Pages/UPIModal';

import { act } from 'react-dom/test-utils';

// Mocking the handlePayment and handleClose functions
const mockHandlePayment = jest.fn();
const mockHandleClose = jest.fn();

describe('UPIModal Component', () => {
    test('renders UPI ID field with label and placeholder', () => {
        render(<UPIModal show={true} handleClose={mockHandleClose} handlePayment={mockHandlePayment} />);

        expect(screen.getByLabelText(/UPI ID/i)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(/Enter UPI ID/i)).toBeInTheDocument();
    });

    test('renders Amount field with label and placeholder', () => {
        render(<UPIModal show={true} handleClose={mockHandleClose} handlePayment={mockHandlePayment} />);

        expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();

    

        expect(screen.getByPlaceholderText(/Enter amount/i)).toBeInTheDocument();
    });

    test('calls handleClose when modal close button is clicked', () => {
        render(<UPIModal show={true} handleClose={mockHandleClose} handlePayment={mockHandlePayment} />);

        // Click the close button
        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        expect(mockHandleClose).toHaveBeenCalled();
    });
});
