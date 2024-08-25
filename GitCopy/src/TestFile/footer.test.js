// Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Components/Footer'; 

describe('Footer Component', () => {
  test('renders the footer heading', () => {
    render(<Footer />);

    
    expect(screen.getByText(/Get our beautiful newsletter straight to your inbox/i)).toBeInTheDocument();
  });

  test('renders the subscription form', () => {
    render(<Footer />);

    
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    
   
    expect(screen.getByText(/Subscribe/i)).toBeInTheDocument();
  });

  test('renders all footer navigation sections', () => {
    render(<Footer />);

    
    const footerNavs = [
      {
        label: "Resources",
        items: [
          "contact",
          "Support",
          "Documentation",
          "Pricing"
        ]
      },
      {
        label: "About",
        items: [
          "Terms",
          "License",
          "Privacy",
          "About US"
        ]
      },
      {
        label: "Explore",
        items: [
          "Showcase",
          "Roadmap",
          "Languages",
          "Blog"
        ]
      },
      {
        label: "Company",
        items: [
          "Partners",
          "Team",
          "Careers"
        ]
      }
    ];

    // Check each navigation section label and items
    footerNavs.forEach(nav => {
      // Check if the section label is rendered
      expect(screen.getByText(nav.label)).toBeInTheDocument();

      // Check if each item in the section is rendered
      nav.items.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });

  
 
});
