import { FC } from 'react';

import useGroupedTodos from 'hooks/complex/useGroupedTodos';

import { useGetTodoItemsQuery } from 'queries/useQueries';

import Loader from 'components/common/loader/Loader';
import EmptyBlock from 'components/complex/empty-block/EmptyBlock';
import ErrorBlock from 'components/complex/error-block/ErrorBlock';
import SearchBar from 'components/complex/search-bar/SearchBar';
import AddTodoButton from 'components/complex/todo-add-button/AddTodoButton';
import TodoList from 'components/complex/todo-list/TodoList';

import './todo-app.css';

const TodoApp: FC = () => {
  const { isFetched, isLoading, isError } = useGetTodoItemsQuery();
  const { hasTodos, noSearchResults, notCompletedFilteredTodos, completedFilteredTodos } =
    useGroupedTodos();

  const loadedSuccessfully = isFetched && !isError;

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h1 className="todo-app-title">Todo List ...</h1>
        {loadedSuccessfully && <SearchBar />}
        <div className="todo-app-body">
          {isLoading && <Loader />}
          {isFetched &&
            (isError ? (
              <ErrorBlock />
            ) : (
              <>
                <TodoList todos={notCompletedFilteredTodos} />
                <EmptyBlock hasTodos={hasTodos} noSearchResults={noSearchResults} />
                <TodoList todos={completedFilteredTodos} />
              </>
            ))}
        </div>
        {loadedSuccessfully && <AddTodoButton />}
      </div>
    </div>
  );
};

export default TodoApp;
