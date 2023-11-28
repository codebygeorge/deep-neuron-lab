import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useStateProvider } from 'providers/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, memo, useRef, useState } from 'react';

import { Todo } from 'shared/types/models/Todo';

import { useAutosizeTextArea, useClickAway, useDebounce, useDidUpdate } from 'hooks/common';

import Checkbox from 'components/common/checkbox/Checkbox';
import Loader from 'components/common/loader/Loader';

import './todo-item.css';

type TodoItemProps = {
  data: Todo;
};

const TodoItem: FC<TodoItemProps> = memo(({ data }) => {
  const { /* id, */ todo, completed /* , userId */ } = data;

  const { toggleTodo, editTodo, deleteTodo } = useStateProvider();

  const itemRef = useRef<HTMLLIElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const toggleTimersRef = useRef<number | undefined>();

  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(todo);
  const [newCompleted, setNewCompleted] = useState(completed);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEdited = newValue !== todo;

  useAutosizeTextArea(textAreaRef, newValue);
  const { disable: disableClickAway, enable: enableClickAway } = useClickAway(
    itemRef,
    closeEditState,
    true,
  );

  const debounceNewValue = useDebounce(newValue, 500);
  // Apply debounced save
  useDidUpdate(async () => {
    setIsLoading(true);
    try {
      await editTodo({
        ...data,
        todo: debounceNewValue,
      });
    } catch (err) {
      // error
    } finally {
      setIsLoading(false);
    }
  }, [debounceNewValue]);

  function openEditState() {
    if (!isEditing && !isLoading) {
      if (completed === newCompleted) {
        enableClickAway();
        setIsEditing(true);
        // setTimeout is necessary to defer the operation until the stack is clear
        setTimeout(() => {
          textAreaRef.current?.focus();
        });
      }
    }
  }

  function closeEditState() {
    if (isEditing) {
      disableClickAway();
      setIsEditing(false);
    }
  }

  const handleToggle = async () => {
    setNewCompleted((prevState) => !prevState);
    setIsEditing(false);

    if (toggleTimersRef.current) {
      setIsWaiting(false);
      clearTimeout(toggleTimersRef.current);
      toggleTimersRef.current = undefined;
    } else {
      setIsWaiting(true);
      toggleTimersRef.current = window.setTimeout(async () => {
        setIsWaiting(false);
        setIsLoading(true);
        try {
          await toggleTodo(data);
        } catch (err) {
          setNewCompleted((prevState) => !prevState);
        } finally {
          setIsLoading(false);
        }
        toggleTimersRef.current = undefined;
      }, 2300);
    }
  };

  const handleDelete = async () => {
    setIsEditing(false);
    setIsLoading(true);
    try {
      await deleteTodo(data);
    } catch (err) {
      // error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      ref={itemRef}
      className={classNames('todo-item', {
        completed,
        'not-completed': !completed,
        'is-editing': isEditing,
        'is-loading': isLoading,
        'is-status-changed': completed !== newCompleted,
      })}
      data-testid="todo-item"
    >
      <div className="todo-item-check">
        <Checkbox
          checked={newCompleted}
          onChange={handleToggle}
          disabled={isEdited || isLoading}
          data-testid="toggle-checkbox"
        />
      </div>

      <div
        className="todo-item-content"
        aria-label="Edit todo"
        role="button"
        tabIndex={0}
        onClick={openEditState}
        onKeyDown={openEditState}
      >
        <textarea
          data-testid="todo-item-textarea"
          ref={textAreaRef}
          rows={1}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length,
            )
          }
          disabled={!isEditing}
        />
      </div>

      <div className="todo-item-actions">
        <button
          data-testid="delete-button"
          className="delete-button"
          type="button"
          aria-label="Delete todo"
          onClick={handleDelete}
          disabled={isEdited || isLoading}
        >
          {isLoading ? <Loader /> : <FontAwesomeIcon icon={faXmark} />}
        </button>
      </div>

      {isWaiting && <div className="waiting-line" />}
    </li>
  );
});

export default TodoItem;
