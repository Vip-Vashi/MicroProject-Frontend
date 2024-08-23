import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreditCardModal from '../Pages/CreditCardModal'
import { Modal, Button, Form } from 'react-bootstrap';

describe('CreditCardModal', () => {
    const handleClose = jest.fn();
    const handlePayment = jest.fn();

    test('renders CreditCardModal component', () => {
        render(<CreditCardModal show={true} handleClose={handleClose} handlePayment={handlePayment} />);

        // Check if modal is visible
        expect(screen.getByRole('dialog')).toBeVisible();
    });

    test('renders form fields with correct labels and placeholders', () => {
        render(<CreditCardModal show={true} handleClose={handleClose} handlePayment={handlePayment} />);

        // Check for form labels and placeholders
        expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter card number')).toBeInTheDocument();

        expect(screen.getByLabelText('Card Holder Name')).toBeInTheDocument();
      

        expect(screen.getByLabelText('Expiry Date (MM/YY)')).toBeInTheDocument();
       

        expect(screen.getByLabelText('CVV')).toBeInTheDocument();
      

        expect(screen.getByLabelText('Amount')).toBeInTheDocument();
       
    });

    test('renders button with correct label', () => {
        render(<CreditCardModal show={true} handleClose={handleClose} handlePayment={handlePayment} />);

        // Check for the button label
        expect(screen.getByRole('button', { name: /Pay/i })).toBeInTheDocument();
    });

    test('renders button with placeholder text', () => {
        render(<CreditCardModal show={true} handleClose={handleClose} handlePayment={handlePayment} />);
        expect(screen.getByPlaceholderText('Enter card number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter card holder name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter expiry date')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter CVV')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Amount')).toBeInTheDocument();
    });


   
});
