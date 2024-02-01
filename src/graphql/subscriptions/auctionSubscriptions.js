import { gql } from '@apollo/client';

export const HANDLE_BID_FEED = gql`
subscription Subscription {
  bidFeed {
    auctionId
    bidAmount
    playerId
  }
}
`

export const HANDLE_PLAYER_BUY_FEED = gql`
subscription Subscription {
  buyFeed {
    auctionId
    auctionName
  }
}
`

export const PLAYER_RESET_FEED = gql`
subscription Subscription {
  playerResetFeed
}
`

export const HANDLE_RESET_PLAYER_BUY = gql`
subscription Subscription {
  playerResetFeed
}`;

export const HANDLE_PLAYER_SELECT_SUBSCRIPTION = gql`
subscription auctionFeed {
  auctionFeed {
    auctionId
    user {
     age
     battingHand
     battingPref
     bowlingHand
     bowlingStyle
     email
     fieldingPref
     firstName
     gender
     lastName
     playerType
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
     }
  }
}
`

export const HANDLE_MOVE_PLAYER_TO_UNALLOCATED = gql`
subscription Subscription {
  playerMovedToUnallocatedFeed
}`;

// export const HANDLE_PLAYER_SELECT_SUBSCRIPTION = gql`
//   subscription AuctionFeed {
//     auctionFeed {
//     auctionId
//     auctionName
//     user {
//     age
//     battingHand
//     battingPref
//     bowlingHand
//     bowlingStyle
//     email
//     fieldingPref
//     firstName
//     gender
//     lastName
//     playerType
//     stats {
//       battingStats {
//         innings
//         runs
//         strikeRate
//       }
//       bowlingStats {
//         economy
//         overs
//         wickets
//       }
//     }
//     }
//   }
// }
// `;