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

export const GET_SINGLE_AUCTION = gql`
query GetAuction($auctionId: String) {
  getAuction(auctionId: $auctionId) {
    auctionId
    auctionName
    bucketWalletBalance
    createdBy
    endTime
    minimumBid
    players {
      age
      email
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
    sportName
    startTime
    teams {
      teamId
      teamName
      teamDescription
      teamCaptain {
        firstName
        age
        battingHand
        battingPref
        bowlingHand
        bowlingStyle
        email
        gender
        lastName
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
        fieldingPref
      }
      teamLogo
    }
    venue
  }
}
`