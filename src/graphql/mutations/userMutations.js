import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
  books {
    author
    title
  }
}
`;

export const LOGIN = gql`
mutation ($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    userData {
      email
      firstName
      lastName
      userId
    }
  }
}
`

export const ADD_CONNECTIONS = gql`
mutation AddConnections($userIds: [String]) {
  addConnections(userIds: $userIds)
}
`

export const UPLOAD_USER_IMAGE = gql`
mutation UploadUserImage($imageUrl: String!) {
  uploadUserImage(imageUrl: $imageUrl)
}
`
export const UPLOAD_CUSTOM_USER_IMAGE = gql`
mutation UploadCustomUserImage($imageUrl: String!, $userId: String!) {
  uploadCustomUserImage(imageUrl: $imageUrl, userId: $userId){
      email
      firstName
      lastName
      userId
  }
}
`

export const REGISTER = gql`
  mutation($email: String!, $password: String!, $mobile: String!, $firstName: String!, $lastName: String!) {
  registerUser(email: $email, password: $password, mobile: $mobile, firstName: $firstName, lastName: $lastName) {
    token
    userData {
      auctions {
        auctionId
        auctionName
      }
      connections {
        user {
          userId
          firstName
          lastName
          email
        }
        connectionBucket
      }
      email
      firstName
      lastName
      mobile
      stats {
      battingStats {
        innings
        runs
        strikeRate
      }
      bowlingStats {
        economy
        wickets
        overs
      }
    }
      userId
    }
  }
}
`;