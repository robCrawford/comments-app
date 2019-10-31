import { Action } from 'redux';
import { PayloadAction } from 'contracts/Redux';
import { Comment } from '../../contracts/Comments';
import { ValueOf } from 'contracts/Utils';

export const commentsActionTypes = {
  COMMENT_ADDED: 'app/COMMENT_ADDED',
} as const;

type CommentsState = {
  feed: Comment[];
};

export type CommentsModuleState = {
  comments: CommentsState;
};

type CommentsActionType = ValueOf<typeof commentsActionTypes>;

type CommentPayloadAction = PayloadAction<{ comment: Comment }, CommentsActionType>;

type CommentsAction =
  | Action<CommentsActionType>
  | CommentPayloadAction;

const initialState: CommentsState = {
  feed: []
};

export const commentsReducer = (state = initialState, action: CommentsAction): CommentsState => {
  const { type } = action;

  switch (type) {
    case commentsActionTypes.COMMENT_ADDED: {
      if ('payload' in action) {
        return {
          ...state,
          feed: state.feed.concat(action.payload.comment)
        };
      }
    }
    default: {
      return state;
    }
  }
};

// Action creators
export const commentAdded = (comment: Comment): CommentPayloadAction => {
  return {
    type: commentsActionTypes.COMMENT_ADDED,
    payload: { comment }
  };
};

// Selectors
export const commentsSelector = ({ comments }: CommentsModuleState): {
  feed: Comment[];
} => ({
  feed: comments.feed
});
