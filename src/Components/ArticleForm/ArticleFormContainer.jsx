import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ArticleForm } from './ArticleForm';

export const ArticleFormContainer = () => {
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === '/new-article') {
      history.replace('/new-article', null);
    }
  }, [history]);

  return <ArticleForm {...history.location.state} />;
};