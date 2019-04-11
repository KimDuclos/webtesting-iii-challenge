// Test away!
import React from "react";
import { render, cleanup } from "react-testing-library";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";

import Controls from "./Controls";
import Dashboard from "../dashboard/Dashboard";

afterEach(cleanup);

describe('Controls Tests', () => {
  it('renders', () => {
    render(<Controls />);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('toggle correct buttons - trigger the right actions.', () => {
    const { getByText } = render(<Dashboard />);

    const closeButton = getByText(/Closed/);
    const lockButton = getByText(/Locked/);

    expect(lockButton).toBeDisabled();
    
    triggerEvent.click(closeButton);
    getByText(/ClosedGate/);

    triggerEvent.click(lockButton);
    getByText(/LockedGate/);
    
    const openButton = getByText(/Open/);
    
    expect(openButton).toBeDisabled();
    
    const unlockButton = getByText(/Unlock/);
    
    triggerEvent.click(unlockButton);
    getByText(/UnlockedGate/);
    
    triggerEvent.click(openButton);
    getByText(/OpenGate/);
  });
});