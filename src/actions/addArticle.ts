import { Dispatch } from 'redux';

export const ADD_ARTICLE = 'ADD_ARTICLE';

const addArticle = data => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_ARTICLE,
    article: data,
  });
};

export default addArticle;
