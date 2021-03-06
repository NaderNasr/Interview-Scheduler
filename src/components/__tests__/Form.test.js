import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Form from 'components/Appointment/Form';
import { fireEvent } from '@testing-library/react';

afterEach(cleanup);

describe('Form', () => {
  const interviewerList = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  //test case 1
  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(<Form />);
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  //test case 2
  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form interviewerList={interviewerList} name="Lydia Miller-Jones" />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  //test case 3
  it('validates that the student name is not blank', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewerList={interviewerList} onSave={onSave} />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  //test case  4
  it('calls onSave function when the name is defined', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
      <Form
        interviewerList={interviewerList}
        onSave={onSave}
        name="Lydia Miller-Jones"
        selectedInterviewerId={3}
      />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 3);
  });

  //test case 5
  it('submits the name entered by the user', () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form
        interviewerList={interviewerList}
        onSave={onSave}
        selectedInterviewerId={3}
        name={'Mildred Nazir'}
      />
    );

    const input = getByPlaceholderText('Enter Student Name');

    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
    // console.log(getByText("Save"))
    fireEvent.click(getByText('Save'));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 3);
  });

  //test case 6
  it('can successfully save after trying to submit an empty student name', () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewerList={interviewerList}
        onSave={onSave}
        selectedInterviewerId={3}
      />
    );

    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByText('Save'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 3);
  });

  //test case  7
  it('calls onCancel and resets the input field', () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewerList={interviewerList}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText('Save'));

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByText('Cancel'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
