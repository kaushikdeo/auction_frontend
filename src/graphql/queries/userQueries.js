import { gql } from '@apollo/client';

export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    getMe {
    age
    email
    firstName
    imageUrl
    gender
    lastName
    mobile
    role
    userId
    stats {
  battingStats {
    innings
    runs
    strikeRate
  }
  bowlingStats {
    economy
    overs
    wickets
  }
}
    connections {
      user {
        userId
        firstName
        lastName
        email
        role
        imageUrl
      }
      connectionBucket
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
    imageUrl
    email
    role
  }
  }
  `;

export const LOGGEDINPLAYERAUCTION = gql`
query GetPlayerAuctions {
  getPlayerAuctions {
    auctionId
    auctionName
    bucketWalletBalance
    endTime
    minimumBid
    sportName
    venue
    createdBy {
      firstName
      lastName
      email
    }
    auctionDetails {
      auctionTeams {
        team {
          teamId
          teamLogo
          teamName
        }
        teamPlayers {
          player {
            firstName
            lastName
            imageUrl
            userId
          }
          isbidded
          role
          soldFor
        }
      }
    }
  }
}
`

export const GET_VIEWER_AUCTIONS = gql`
query GetViewerAuctions {
  getViewerAuctions {
    auctionId
    auctionName
    venue
  }
}
`