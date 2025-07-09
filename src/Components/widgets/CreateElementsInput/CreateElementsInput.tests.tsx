import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CreateElementsInput from './CreateElementsInput';
import createIcon from '@/icons/create.svg';

const mockProps = {
    isTasksVisible: true,
    toggleTasksVisible: jest.fn(),
    onCreate: jest.fn(),
    buttonLabel: 'Add Task',
    placeholder: 'Enter task...',
    buttonIcon: createIcon,
};

describe('CreateElementsInput Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders basic elements', () => {
        render(<CreateElementsInput {...mockProps} />);

        expect(
            screen.getByPlaceholderText('Enter task...'),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /toggle/i }),
        ).toBeInTheDocument();
    });

    test('toggles visibility icon when clicked', async () => {
        render(<CreateElementsInput {...mockProps} />);
        const toggleButton = screen.getByRole('button', { name: /toggle/i });

        await userEvent.click(toggleButton);
        expect(mockProps.toggleTasksVisible).toHaveBeenCalledTimes(1);
    });

    test('updates input value on typing', async () => {
        render(<CreateElementsInput {...mockProps} />);
        const input = screen.getByPlaceholderText('Enter task...');

        await userEvent.type(input, 'New Task');
        expect(input).toHaveValue('New Task');
    });

    test('calls onCreate with text when Enter pressed', async () => {
        render(<CreateElementsInput {...mockProps} />);
        const input = screen.getByPlaceholderText('Enter task...');

        await userEvent.type(input, 'New Task{enter}');
        expect(mockProps.onCreate).toHaveBeenCalledWith('New Task');
        expect(input).toHaveValue('');
    });

    test('calls onCreate when button clicked (text variant)', async () => {
        render(<CreateElementsInput {...mockProps} buttonType="text" />);
        const input = screen.getByPlaceholderText('Enter task...');
        const addButton = screen.getByRole('button', { name: /add task/i });

        await userEvent.type(input, 'New Task');
        await userEvent.click(addButton);
        expect(mockProps.onCreate).toHaveBeenCalledWith('New Task');
    });

    test('calls onCreate when icon button clicked', async () => {
        render(<CreateElementsInput {...mockProps} buttonType="icon" />);
        const input = screen.getByPlaceholderText('Enter task...');
        const addButton = screen.getByRole('button', { name: /create/i });

        await userEvent.type(input, 'New Task');
        await userEvent.click(addButton);
        expect(mockProps.onCreate).toHaveBeenCalledWith('New Task');
    });

    test('does not call onCreate with empty input', async () => {
        render(<CreateElementsInput {...mockProps} />);
        const input = screen.getByPlaceholderText('Enter task...');

        await userEvent.type(input, '{enter}');
        expect(mockProps.onCreate).not.toHaveBeenCalled();
    });

    test('applies focused styles when input is focused', async () => {
        render(<CreateElementsInput {...mockProps} />);
        const input = screen.getByPlaceholderText('Enter task...');
        const container = input.closest('div');

        fireEvent.focus(input);
        expect(container).toHaveClass('focused');

        fireEvent.blur(input);
        expect(container).not.toHaveClass('focused');
    });

    test('maintains focus after submission', async () => {
        render(<CreateElementsInput {...mockProps} />);
        const input = screen.getByPlaceholderText('Enter task...');

        await userEvent.type(input, 'New Task{enter}');
        expect(input).toHaveFocus();
    });

    test('renders icon button when buttonType is icon', () => {
        render(<CreateElementsInput {...mockProps} buttonType="icon" />);
        expect(
            screen.getByRole('button', { name: /create/i }),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: /add task/i }),
        ).not.toBeInTheDocument();
    });

    test('renders text button when buttonType is text', () => {
        render(<CreateElementsInput {...mockProps} buttonType="text" />);
        expect(
            screen.getByRole('button', { name: /add task/i }),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: /create/i }),
        ).not.toBeInTheDocument();
    });
});
