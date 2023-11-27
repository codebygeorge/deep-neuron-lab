import { FC } from 'react';

import './empty-block.css';

type EmptyBlockProps = {
  hasTodos: boolean;
  noSearchResults: boolean;
};

const EmptyBlock: FC<EmptyBlockProps> = ({ hasTodos, noSearchResults }) =>
  !hasTodos || (hasTodos && noSearchResults) ? (
    <div className="empty-list" data-testid="empty-block">
      <span>{hasTodos && noSearchResults ? 'No todos found' : 'You have no todos!'}</span>
    </div>
  ) : (
    <hr className="todo-app-list-divider" />
  );

export default EmptyBlock;
