import gql from 'graphql-tag';

export const ADD_USER = gql`
    mutation addUser($username:String!, $email:String!, $password:String!){
        addUser(username:$username, email:$email, password:$password){
            token
            user {
                _id
                username
            }
        }
    }
`;
export const LOGIN = gql`
    mutation login($email:String!, $password:String!) {
        login(email: $email, password:$password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
export const SAVE_BOOK = gql`
    mutation saveBook($input:BookInput!) {
        saveBook(input:$input) {
            username
            email
            bookCount
            savedBooks {
                title
                bookId
            }
        }
    }
`;
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId:ID!) {
        removeBook(bookId:$bookId) {
            username
            email
            bookCount
            savedBooks {
                title
                bookId
            }
        }
    }
`; 