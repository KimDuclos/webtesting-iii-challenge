// Test away!
import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import renderer from 'react-test-renderer';
import 'jest-dom/extend-expect';
import Display from './Display';
import Dashboard from '../dashboard/Dashboard';

afterEach(cleanup);

describe('Display tests', () => {
  it(renders, () => {
    render(<Display />);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Display />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('correct colors and words on load', () => {
    const { getByText } = render(<Display />);

    const greenOpen = getByText(/Open/);
    const greenUnlocked = getByText(/Unlocked/);

    expect(greenOpen).toHaveClass('green-led');
    expect(greenUnlocked).toHaveClass('green-led');
  });

  it('correct colors for event when triggered', () => {
    const { getByText } = render(<Dashboard />);

    const greenOpen = getByText(/Open/);
    const greenUnlocked = getByText(/Unlocked/);

    expect(greenOpen).toHaveClass('green-led');
    expect(greenUnlocked).toHaveClass('green-led');
    
    const closeButton = getByText(/Close Gate/);
    
    // red for closed / locked
    fireEvent.click(closeButton);
    const redClosed = getByText(/Closed/);
    expect(redClosed).toHaveClass('red-led');
    const lockButton = getByText(/Lock Gate/);
    
    fireEvent.click(lockButton);
    const redLocked = getByText(/Locked/);
    expect(redLocked).toHaveClass('red-led');
    const unlockButton = getByText(/Unlock Gate/);
    
    // green for open / unlocked
    fireEvent.click(unlockButton);
    expect(greenUnlocked).toHaveClass('green-led');
    const openButton = getByText(/Open Gate/);
    
    fireEvent.click(openButton);
    expect(greenOpen).toHaveClass('green-led');
  });
});