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
      imageUrl
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

export const HANDLE_BUY_PLAYER = gql`
mutation ($playerId: ID!, $teamId: ID!, $bidAmount: Int!, $auctionId: ID!) {
  handleBuyPlayer(playerId: $playerId, teamId: $teamId, bidAmount: $bidAmount, auctionId: $auctionId)
}`

export const HANDLE_SHIFT_PLAYER_TO_UNALLOCATED_BUCKET = gql`
mutation ($playerId: ID!, $auctionId: ID!) {
  handleAddPlayerToUnallocatedBucket(playerId: $playerId, auctionId: $auctionId)
}
`
export const HANDLE_BID_FOR_PLAYER = gql`
mutation INCREASEBID($playerId: ID!, $bidAmount: Int!, $auctionId: ID!) {
  handleIncreaseBid(playerId: $playerId, bidAmount: $bidAmount, auctionId: $auctionId)
}
`;

export const HANDLE_RESET_BUY_PLAYER = gql`
mutation ($playerId: ID!, $teamId: ID!, $auctionId: ID!) {
  handleResetBuy(playerId: $playerId, teamId: $teamId, auctionId: $auctionId)
}
`

export const UPDATE_AUCTION = gql`
mutation UpdateAuction($updateAuctionInput: UpdateAuctionInput!) {
  updateAuction(updateAuctionInput: $updateAuctionInput) {
    auctionId
    auctionName
    startTime
    sportName
    venue
  }
}
`