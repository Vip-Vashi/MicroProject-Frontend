// CreditCardModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const creditCardSchema = yup.object().shape({
  cardNumber: yup.string().required('Card number is required').matches(/^\d{16}$/, 'Card number must be 16 digits'),
  cardHolderName: yup.string().required('Card holder name is required'),
  expiryDate: yup.string().required('Expiry date is required').matches(/^\d{2}\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvv: yup.string().required('CVV is required').matches(/^\d{3}$/, 'CVV must be 3 digits'),
  amount:yup.number().required('Amount to pay is required').positive('Amount must be positive')
});

const CreditCardModal = ({ show, handleClose, walletPayment }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(creditCardSchema),
  });

  const onSubmit = data => {
    walletPayment(data);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Credit Card Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="Enter card number" {...register('cardNumber')} isInvalid={!!errors.cardNumber} />
            <Form.Control.Feedback type="invalid">{errors.cardNumber?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formCardHolderName">
            <Form.Label>Card Holder Name</Form.Label>
            <Form.Control type="text" placeholder="Enter card holder name" {...register('cardHolderName')} isInvalid={!!errors.cardHolderName} />
            <Form.Control.Feedback type="invalid">{errors.cardHolderName?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formExpiryDate">
            <Form.Label>Expiry Date (MM/YY)</Form.Label>
            <Form.Control type="text" placeholder="Enter expiry date" {...register('expiryDate')} isInvalid={!!errors.expiryDate} />
            <Form.Control.Feedback type="invalid">{errors.expiryDate?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formCvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control type="password" placeholder="Enter CVV" {...register('cvv')} isInvalid={!!errors.cvv} />
            <Form.Control.Feedback type="invalid">{errors.cvv?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount </Form.Label>
            <Form.Control type="number" placeholder="Enter Amount" {...register('amount')} isInvalid={!!errors.amount} />
            <Form.Control.Feedback type="invalid">{errors.amount?.message}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">Pay</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreditCardModal;
