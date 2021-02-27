export const commentsActions = {
  COMMENT_ADDED: 'app/COMMENT_ADDED',
};

const initialState = {
  feed: []
};

export const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case commentsActions.COMMENT_ADDED:
      return {
        ...state,
        feed: state.feed.concat(payload.comment)
      };
    default: {
      return state;
    }
  }
};

// Action creators
export const commentAdded = (comment) => {
  return {
    type: commentsActions.COMMENT_ADDED,
    payload: { comment }
  };
};

// Selectors
export const commentsSelector = ({ comments }) => ({
  feed: comments.feed
});
