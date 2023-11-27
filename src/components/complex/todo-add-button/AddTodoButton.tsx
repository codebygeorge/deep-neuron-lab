import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useStateProvider } from 'providers/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useState } from 'react';

import Loader from 'components/common/loader/Loader';

import './add-todo-button.css';

const AddTodoButton = memo(() => {
  const { addTodo } = useStateProvider();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      await addTodo();
    } catch (err) {
      // error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="add-button"
      type="button"
      aria-label="Add todo"
      data-testid="add-button"
      onClick={handleAdd}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <FontAwesomeIcon icon={faCirclePlus} />
          <span>Todo</span>
        </>
      )}
    </button>
  );
});

export default AddTodoButton;
