import { gql } from "@apollo/client";

const GET_BLOGS_INFO = gql`
    query {
        posts {
            author {
                name,
                slug
                avatar {
                    url
                }
            },
            id,
            title,
            slug,
            dataPublished
            coverPhoto {
                url
            },
            
        }
    }
`;

const GET_AUTHORS_INFO = gql`
    query {
        authors {
            id,
            name,
            slug,
            avatar {
                url
            }
        }
    }
`

const GET_AUTHOR = gql`
    query getAuthorInfo($slug:String!) {
        author(where:{slug:$slug}) {
            avatar {
                url
            },
            name,
            field,
            description{
                html
            },
            post {
                coverPhoto {
                    url
                },
                id,
                slug,
                title
            }
        }  
    }
`;

const GET_POST = gql`
    query getPostInfo($slug:String!) {
        post(where:{slug:$slug}) {
            author {
                avatar {
                    url
                }
                name, 
                field,
                slug
            }
            content {
                html
            }
            coverPhoto {
                url
            }
            title,
            tags
        }
    }
`

const GET_POST_COMMENTS = gql`
    query getPostComments($slug:String!) {
        comments(where:{post:{slug:$slug}}) {
            id, 
            name, 
            text
        }
    }
`;

const GET_SEARCHED_POSTS = gql`
query getSearchedPosts($tags_contains:String!) {
    posts(where: {tags_contains:$tags_contains}) {
            author {
                 name,
                slug
                avatar {
                    url
                }
            },
            id,
            title,
            slug,
            dataPublished
            coverPhoto {
                url
            }
  }
}
`

const GET_LAST_N_POSTS = gql`
    query MyQuery {
        posts(first: 5) {
            author {
                 name,
                slug
                avatar {
                    url
                }
            },
            id,
            title,
            slug,
            dataPublished
            coverPhoto {
                url
            }
        }
    }
`;

const GET_TEN_POSTS_PER_PAGE = gql`
    query getPostsPerPage($first:Int!, $skip:Int!) {
        posts(first: $first, skip: $skip) {
            author {
                name,
                slug
                avatar {
                    url
                }
            },
            id,
            title,
            slug,
            dataPublished
            coverPhoto {
                url
            },
        }
        postsConnection {
            aggregate {
            count
            }
        }
}
`


export {
    GET_BLOGS_INFO,
    GET_AUTHORS_INFO,
    GET_AUTHOR,
    GET_POST,
    GET_POST_COMMENTS,
    GET_SEARCHED_POSTS,
    GET_LAST_N_POSTS,
    GET_TEN_POSTS_PER_PAGE
}