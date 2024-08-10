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
            }
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
            title
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
query getSearchedPosts($title_contains:String!) {
  posts(where: {title_contains:$title_contains}){
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


export {
    GET_BLOGS_INFO,
    GET_AUTHORS_INFO,
    GET_AUTHOR,
    GET_POST,
    GET_POST_COMMENTS,
    GET_SEARCHED_POSTS
}