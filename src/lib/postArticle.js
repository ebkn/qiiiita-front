import axios from 'axios';

import { API_URL } from '../config';

const postArticle = (data) => (
  axios.post(API_URL, { article: data })
    .then(res => {
      return res.data;
    }).catch(err =>
      alert(err)
    )
);

export default postArticle;
