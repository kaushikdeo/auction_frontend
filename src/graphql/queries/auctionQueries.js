import { gql } from '@apollo/client';

export const GET_AUCTIONS = gql`
  query Auctions {
  auctions {
    auctionId
    auctionName
    showPlayerStats
    bucketWalletBalance
    endTime
    participants {
      currentBid
      currentTeam
      lastBid
      playerRole
    }
    venue
    sportName
    startTime
    walletBalDifference
    createdBy {
      firstName
      lastName
      email
    }
  }
}
`;

export const GET_SINGLE_AUCTION = gql`
query GetAuction($auctionId: String) {
  getAuction(auctionId: $auctionId) {
    auctionId
    auctionName
    showPlayerStats
    bucketWalletBalance
    createdBy {
      firstName
      lastName
      email
    }
    endTime
    minimumBid
    stepPrice
    auctionDetails {
      auctionTeams {
        team {
          teamId
          teamName
        }
        teamPlayers {
          isbidded
          role
          soldFor
          player {
            lastName
            firstName
            imageUrl
            userId
            playerType
          }
        }
      }
    }
    unallocatedPlayers {
      age
      email
      battingHand
      imageUrl
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
      imageUrl
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
        imageUrl
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

export const GET_SINGLE_AUCTION_FOR_PLAYER = gql`
query GetAuctionDetailsForCaptain($auctionId: String) {
  getAuctionDetailsForCaptain(auctionId: $auctionId) {
    auctionData {
      auctionId
      showPlayerStats
      createdBy{
        firstName
        lastName
      }
      auctionName
      bucketWalletBalance
      endTime
      minimumBid
      stepPrice
      auctionDetails {
      auctionTeams {
        team {
          teamId
          teamName
        }
        teamPlayers {
          isbidded
          role
          soldFor
          player {
            lastName
            firstName
            userId
            email
            playerType
            imageUrl
          }
        }
      }
    }
    unallocatedPlayers {
      age
      email
      battingHand
      battingPref
      bowlingHand
      bowlingStyle
      email
      fieldingPref
      firstName
      imageUrl
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
    players {
      age
      email
      battingHand
      battingPref
      imageUrl
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
        imageUrl
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
    playersBought {
      player {
        firstName
        userId
        lastName
      }
      team {
        teamId
        teamName
        teamDescription
      }
    }
    selectedPlayer{
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
     imageUrl
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
    currentPlayerBid
  }
}
`

export const GET_SINGLE_AUCTION_FOR_VIEWER = gql`
query GetAuctionDetailsForViewer($auctionId: String) {
  getAuctionDetailsForViewer(auctionId: $auctionId) {
    auctionName
    auctionId
    minimumBid
    showPlayerStats
  }
}
`