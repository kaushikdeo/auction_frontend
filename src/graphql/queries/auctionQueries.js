import { gql } from '@apollo/client';

export const GET_AUCTIONS = gql`
  query Auctions {
  auctions {
    auctionId
    auctionName
    bucketWalletBalance
    endTime
    participants {
      currentBid
      currentTeam
      lastBid
      playerRole
    }
    sportName
    startTime
    walletBalDifference
  }
}
`;