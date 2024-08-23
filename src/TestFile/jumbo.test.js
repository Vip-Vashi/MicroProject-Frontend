// Jumbo.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Jumbo from '../Components/Jumbo'; 

describe('Jumbo Component', () => {
  test('renders the Jumbo component correctly', () => {
    render(
      <Router>
        <Jumbo />
      </Router>
    );

    // Check if the main heading is rendered with the correct text
    expect(screen.getByRole('head')).toHaveTextContent('The Perfect Way to Grab a Deal');

    expect(screen.getByRole('bannertxt')).toHaveTextContent(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nuncet tempus blandit, metus mi consectetur nibh, a pharetra felis turpis vitae ligula. Etiam laoreet velit nec neque ultrices, non consequat mauris tincidunt. pharetra felis turpis vitae ligula. Etiam laoreet velit nec neque ultrices, non consequat mauris tincidunt.'
      );
      expect(screen.getByRole('prod', )).toBeInTheDocument();
    
  });

 

  

  
  

});
