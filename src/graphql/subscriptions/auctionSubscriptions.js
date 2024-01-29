import { gql } from '@apollo/client';

export const HANDLE_BID_FEED = gql`
subscription {
  bidFeed {
    auctionId
    bidAmount
    playerId
  }
}
`

export const HANDLE_PLAYER_BUY_FEED = gql`
subscription {
  buyFeed {
    auctionId
    auctionName
  }
}
`

export const HANDLE_RESET_PLAYER_BUY = gql`
subscription Subscription {
  playerResetFeed
}`;

export const HANDLE_PLAYER_SELECT_SUBSCRIPTION = gql`
subscription Subscription {
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