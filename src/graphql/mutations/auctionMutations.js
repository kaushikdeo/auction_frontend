import { gql } from '@apollo/client';

export const ADD_NEW_AUCTION = gql`
  mutation($newAuctionInput: NewAuctionInput) {
  addNewAuction(newAuctionInput: $newAuctionInput) {
    auctionName
    bucketWalletBalance
    endTime
    sportName
    startTime
    walletBalDifference
  }
}
`;

export const HANDLE_PLAYER_SELECT = gql`
mutation($playerId: ID!, $auctionId: ID!) {
  handlePlayerSelect(playerId: $playerId, auctionId: $auctionId) {
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
      userId
  }
}
`