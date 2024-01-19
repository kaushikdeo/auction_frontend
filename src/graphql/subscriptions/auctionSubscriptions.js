import { gql } from '@apollo/client';

export const HANDLE_PLAYER_SELECT_SUBSCRIPTION = gql`
  subscription {
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
`;