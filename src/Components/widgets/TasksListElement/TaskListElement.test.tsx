import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TasksListElement from './TasksListElement';
import { ITask } from '@/types';

jest.mock('@/icons/delete.svg', () => ({
    ReactComponent: () => <div data-testid="delete-icon" />,
}));

jest.mock('@/icons/edit.svg', () => ({
    ReactComponent: () => <div data-testid="edit-icon" />,
}));

jest.mock(
    '@/Components/ui/Checkbox',
    () =>
        function (props: { checked: boolean; onChange: () => void }) {
            return (
                <input
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.onChange}
                    data-testid="checkbox"
                />
            );
        },
);

const mockTask: ITask = {
    id: 1,
    text: 'Test task',
    isCompleted: false,
};

const mockProps = {
    task: mockTask,
    index: 0,
    onChangeStatus: jest.fn(),
    onChangeText: jest.fn(),
    onTaskDelete: jest.fn(),
};

describe('TasksListElement Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders task with correct text', () => {
        render(<TasksListElement {...mockProps} />);
        expect(screen.getByText('Test task')).toBeInTheDocument();
    });

    test('renders checkbox with correct status', () => {
        render(<TasksListElement {...mockProps} />);
        const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);
    });

    test('checkbox changes task status', async () => {
        render(<TasksListElement {...mockProps} />);
        const checkbox = screen.getByTestId('checkbox');
        await userEvent.click(checkbox);
        expect(mockProps.onChangeStatus).toHaveBeenCalledWith(0);
    });

    test('shows completed style when task is completed', () => {
        render(
            <TasksListElement
                {...mockProps}
                task={{ ...mockTask, isCompleted: true }}
            />,
        );
        const textElement = screen.getByText('Test task');
        expect(textElement).toHaveClass('completed');
    });

    test('renders action buttons', () => {
        render(<TasksListElement {...mockProps} />);
        expect(screen.getByTestId('icon-button-delete')).toBeInTheDocument();
        expect(screen.getByTestId('icon-button-edit')).toBeInTheDocument();
    });

    test('enters edit mode when edit button clicked', async () => {
        render(<TasksListElement {...mockProps} />);
        const editButton = screen.getByTestId('icon-button-edit');
        await userEvent.click(editButton);

        const textElement = screen.getByText('Test task');
        expect(textElement).toHaveAttribute('contentEditable', 'true');
    });

    test('saves changes on blur', async () => {
        render(<TasksListElement {...mockProps} />);
        const editButton = screen.getByTestId('icon-button-edit');
        await userEvent.click(editButton);

        const textElement = screen.getByText('Test task');
        fireEvent.input(textElement, {
            target: { textContent: 'Updated task' },
        });
        fireEvent.blur(textElement);

        expect(mockProps.onChangeText).toHaveBeenCalledWith(0, 'Updated task');
    });

    test('saves changes on Enter key', async () => {
        render(<TasksListElement {...mockProps} />);
        const editButton = screen.getByTestId('icon-button-edit');
        await userEvent.click(editButton);

        const textElement = screen.getByText('Test task');
        fireEvent.input(textElement, {
            target: { textContent: 'Updated task' },
        });
        fireEvent.keyDown(textElement, { key: 'Enter' });

        expect(mockProps.onChangeText).toHaveBeenCalledWith(0, 'Updated task');
    });

    test('cancels edit on Escape key', async () => {
        render(<TasksListElement {...mockProps} />);
        const editButton = screen.getByTestId('icon-button-edit');
        await userEvent.click(editButton);

        const textElement = screen.getByText('Test task');
        fireEvent.keyDown(textElement, { key: 'Escape' });

        expect(textElement).toHaveTextContent('Test task'); // Исходный текст не изменился
    });

    test('deletes task when delete button clicked', async () => {
        render(<TasksListElement {...mockProps} />);
        const deleteButton = screen.getByTestId('icon-button-delete');
        await userEvent.click(deleteButton);
        expect(mockProps.onTaskDelete).toHaveBeenCalledWith(mockTask);
    });

    test('hides action buttons in edit mode', async () => {
        render(<TasksListElement {...mockProps} />);
        const editButton = screen.getByTestId('icon-button-edit');
        await userEvent.click(editButton);

        expect(
            screen.queryByTestId('icon-button-delete'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('icon-button-edit'),
        ).not.toBeInTheDocument();
    });
});
