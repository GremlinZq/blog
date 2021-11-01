import {ArticleForm} from "./ArticleForm";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";

export const ArticleFormContainer = () => {
    const history = useHistory();

    useEffect(() => {
        if (history.location.pathname === '/new-article') {
            history.replace('/new-article', null);
        }
    }, [history])

    return <ArticleForm {...history.location.state} />
}