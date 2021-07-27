import gql from 'graphql-tag';

export const QUERY_ME = gql`
{ 
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            title
            bookId
            authors
            image
            link
            description
        }
    }
}
`; 