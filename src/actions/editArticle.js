export const EDIT_TITLE = 'EDIT_TITLE';
export const EDIT_CONTENT = 'EDIT_COTENT';

export const editTitle = title => (dispatch) => {
  dispatch({
    type: EDIT_TITLE,
    title,
  });
};

export const editContent = content => (dispatch) => {
  dispatch({
    type: EDIT_CONTENT,
    content,
  });
};

