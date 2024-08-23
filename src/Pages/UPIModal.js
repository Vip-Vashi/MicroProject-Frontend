// UPIModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const upiSchema = yup.object().shape({
  upiId: yup.string().required('UPI ID is required').email('UPI ID must be a valid email'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
});

const UPIModal = ({ show, handleClose, handlePayment }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(upiSchema),
  });

  const onSubmit = data => {
    handlePayment(data);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>UPI Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formUpiId">
            <Form.Label>UPI ID</Form.Label>
            <Form.Control type="text" placeholder="Enter UPI ID" {...register('upiId')} isInvalid={!!errors.upiId} />
            <Form.Control.Feedback type="invalid">{errors.upiId?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="Enter amount" {...register('amount')} isInvalid={!!errors.amount} />
            <Form.Control.Feedback type="invalid">{errors.amount?.message}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">Pay</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UPIModal;
