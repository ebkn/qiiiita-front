export const SET_ARTICLE = 'SET_ARTICLE';

const setArticle = article => dispatch => (
  dispatch({
    type: SET_ARTICLE,
    title: article.title,
    content: article.content,
  })
);

export default setArticle;
