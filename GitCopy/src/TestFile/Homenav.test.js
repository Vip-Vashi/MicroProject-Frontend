// Navbar.test.js
import React from 'react';
import { render, screen, getByText } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Navbar from '../Components/Navbar'; 

describe('Navbar Component', () => {
  test('renders the Navbar component with correct headings and text', () => {
    render(<Navbar />);

    // Check if the main heading is rendered with the correct text
    expect(screen.getByText(/Anywhere Anytime Anyone/i)).toBeInTheDocument();
    expect(screen.getByText(/`AAA` Auction House/i)).toBeInTheDocument();

   
  });

  test('renders the Banner  text', () => {
    render(<Navbar />);

   

    // Check if the paragraph text is rendered correctly
    expect(screen.getByText(/Best Online Auction Site Providing 100% Reliable and Secured Auctioning-Bidding Services/i)).toBeInTheDocument();
    expect(screen.getByText(/An online auction platform, where you can sell all sorts of items with ease with our popular e-auction window./i)).toBeInTheDocument();
  });


  test('renders navigation links correctly', () => {
    render(<Navbar />);

    // Check navigation links
    const aboutLink = screen.getByText(/About us/i);
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest('a')).toHaveAttribute('href', '#about');

    const contactLink = screen.getByText(/Contact us/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '#contact');

    // Check the Log In link
    const logInLink = screen.getByText(/Log In/i);
    expect(logInLink).toBeInTheDocument();
    expect(logInLink.closest('a')).toHaveAttribute('href', '/login');
  });

  test('renders buttons with correct text', () => {
    render(<Navbar />);

    // Check if the "Get started" button is present and has correct text
    const getStartedButton = screen.getByText(/Get started/i);
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton.closest('a')).toHaveAttribute('href', '/login');

    // Check if the "Signup" button is present and has correct text
    const signupButton = screen.getByText(/Signup/i);
    expect(signupButton).toBeInTheDocument();
    expect(signupButton.closest('a')).toHaveAttribute('href', '/register');
  });

  test('renders the logo image', () => {
    render(<Navbar />);

    // Check if the logo image is rendered with the correct src
    const logoImage = screen.getByAltText(/logo/i);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'https://irp.cdn-website.com/27143412/dms3rep/multi/Atterberry-Symbol---3-Color.png');
  });

  test('renders banner image', () => {
    render(<Navbar />);

    // Check if the banner image is rendered with the correct src
    const bannerImage = screen.getByRole('img', { name: '' });
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute('src', 'bidbanner_prev_ui.png');
  });
});
