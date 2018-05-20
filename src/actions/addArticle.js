export const ADD_ARTICLE = 'ADD_ARTICLE';

const addArticle = data => (dispatch) => {
  dispatch({
    type: ADD_ARTICLE,
    article: data,
  });
};

export default addArticle;
