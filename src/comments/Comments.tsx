import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { commentsSelector } from './comments-redux';
import { getId } from '../services/comments';
import { Comment } from 'contracts/Comments';

type Props = {
  onSubmit: (comment: Comment) => void;
};

const Comments: FC<Props> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const { feed } = useSelector(commentsSelector);

  return (
    <form>
      {feed.map(
        ({ text, id }) => <div data-testid={id} key={id}>{text}</div>
      )}
      <div>
        <textarea onChange={({ target }): void => setInput(target.value)}/>
      </div>
      <button type='button' onClick={(): void => onSubmit({ text: input, id: getId() })}>Submit</button>
    </form>
  );
};

export default Comments;
