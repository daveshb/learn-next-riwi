import { render, screen } from '@testing-library/react';

import { MiButton } from '../components/button/Button';

const handleClic =()=>{
    console.log('clic')
} 

test('renderiza label en el DOM', () => {
  render(<MiButton text="Guardar" icon="X" click={handleClic} labelButton='main-button' />);
  expect(screen.getByText('Guardar')).toBeInTheDocument();
  expect(screen.getByLabelText('main-button')).toBeInTheDocument();
});