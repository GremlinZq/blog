export const getApplicationInitialized = state => state.app.applicationInitialized;
export const getUserAuthorization = state => state.auth.isLoggedIn;
export const getSuccessfulArticleCreation = state => state.articles.successfulArticleCreation;
export const getArticles = state => state.articles.articles;
export const getIsLoadingAllArticle = state => state.articles.isLoadingAllArticle;
export const getCurrentPage = state => state.articles.currentPage;
export const getArticlesCount = state => state.articles.articlesCount;
export const getCurrentArticle = state => state.articles.currentArticle;
export const getIsLoadingArticle = state => state.articles.isLoadingArticle;
export const getOpenArticle = state => state.articles.openArticle;

export const getAuthUser = state => state.auth.authUser
export const getProfileEdit = state => state.auth.profileEdited;