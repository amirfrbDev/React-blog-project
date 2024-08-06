import { gql } from "@apollo/client";

const SEND_COMMENT = gql`
        mutation sendComment($name:String!, $text:String!, $email:String!, $slug:String!) {
        createComment(
            data: {name: $name, text: $text, email: $email, post:{connect:{slug:$slug}}} ) {
            id, 
            name,
            text, email
        }
        }
`;



export { SEND_COMMENT }