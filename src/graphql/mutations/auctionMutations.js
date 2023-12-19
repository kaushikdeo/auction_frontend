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