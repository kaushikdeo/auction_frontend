import { gql } from '@apollo/client';

export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    getMe {
    age
    email
    firstName
    gender
    lastName
    mobile
    role
    userId
    connections {
      userId
      firstName
      lastName
      email
      role
    }
    auctions {
        auctionId
    }
  }
}
`;

export const SEARCH_USERS_BY_EMAIL = gql`
  query SearchUsersByEmail($email: String) {
    searchUsers(email: $email) {
    userId
    lastName
    firstName
    email
    role
  }
  }
  `;