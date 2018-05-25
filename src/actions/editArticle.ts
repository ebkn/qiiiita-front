import { Dispatch } from 'redux';

export const EDIT_TITLE = 'EDIT_TITLE';
export const EDIT_CONTENT = 'EDIT_COTENT';

export const editTitle = title => (dispatch: Dispatch) => {
  dispatch({
    title,
    type: EDIT_TITLE,
  });
};

export const editContent = content => (dispatch: Dispatch) => {
  dispatch({
    content,
    type: EDIT_CONTENT,
  });
};
