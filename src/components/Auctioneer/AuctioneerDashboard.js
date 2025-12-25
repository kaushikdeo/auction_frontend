import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Tab, 
  Tabs, 
  Card, 
  CardContent, 
  Grid,
  Button,
  IconButton,
  Avatar,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GavelIcon from '@mui/icons-material/Gavel';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  margin: '10px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  position: 'relative',
  '& .card-actions': {
    opacity: 0
  },
  '&:hover .card-actions': {
    opacity: 1
  }
}));

const CardActions = styled(Box)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  display: 'flex',
  gap: '8px',
  background: '#ffffff',
  padding: '4px',
  borderRadius: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'opacity 0.2s ease'
});

const CreateButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  borderRadius: '50%',
  width: '56px',
  height: '56px',
  minWidth: 'unset',
  background: '#1976d2',
  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
  '&:hover': {
    background: '#1565c0'
  }
}));

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    height: '3px',
    borderRadius: '1.5px',
    backgroundColor: '#1976d2',
  },
});

const AuctioneerDashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCreateAuction = () => {
    navigate('/create-auction');
  };

  const handleEditAuction = (id) => {
    console.log('Edit auction:', id);
  };

  const handleDeleteAuction = (id) => {
    console.log('Delete auction:', id);
  };

  const mockAuctions = [
    {
      id: 1,
      date: '2 Mar 25 - 3:56 pm',
      title: 'BPL 2025',
      creator: 'Kaushik Deo',
      sport: 'Box Cricket',
      venue: 'Bimbisar',
      status: 'Upcoming'
    },
    {
      id: 2,
      date: '5 Mar 25 - 2:00 pm',
      title: 'IPL 2025',
      creator: 'John Doe',
      sport: 'Cricket',
      venue: 'Mumbai',
      status: 'Live'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      pt: 4,
      pb: 8
    }}>
      <Container maxWidth="xl">
        <Paper elevation={0} sx={{ 
          p: 4, 
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          mb: 4,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4
          }}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#1976d2',
                  fontWeight: 600,
                  mb: 1 
                }}
              >
                Auctioneer Dashboard
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#64748b' }}>
                Manage your auctions and track their progress
              </Typography>
            </Box>
            <Avatar 
              sx={{ 
                bgcolor: '#1976d2',
                width: 56, 
                height: 56,
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)'
              }}
            >
              <GavelIcon />
            </Avatar>
          </Box>

          <Box sx={{ 
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            p: 1,
            mb: 4
          }}>
            <StyledTabs 
              value={currentTab} 
              onChange={handleTabChange}
              textColor="primary"
              variant="fullWidth"
            >
              <Tab 
                label="Current Auctions" 
                sx={{ 
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none'
                }} 
              />
              <Tab 
                label="Past Auctions" 
                sx={{ 
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none'
                }}
              />
            </StyledTabs>
          </Box>

          {currentTab === 0 && (
            <Grid container spacing={3}>
              {mockAuctions.map((auction) => (
                <Grid item xs={12} md={4} key={auction.id}>
                  <StyledCard>
                    <CardActions className="card-actions">
                      <IconButton 
                        size="small" 
                        sx={{ color: '#1976d2' }} 
                        onClick={() => handleEditAuction(auction.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ color: '#ef4444' }} 
                        onClick={() => handleDeleteAuction(auction.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 2
                      }}>
                        <Typography variant="subtitle2" sx={{ color: '#64748b' }}>
                          {auction.date}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            bgcolor: auction.status === 'Live' ? '#22c55e' : '#f59e0b',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        >
                          {auction.status}
                        </Typography>
                      </Box>
                      
                      <Typography variant="h5" sx={{ 
                        mb: 3, 
                        color: '#0f172a',
                        fontWeight: 600 
                      }}>
                        {auction.title}
                      </Typography>

                      <Box sx={{ 
                        py: 2,
                        borderTop: '1px solid #e2e8f0',
                        borderBottom: '1px solid #e2e8f0',
                      }}>
                        <Typography variant="body1" sx={{ 
                          mb: 1.5,
                          color: '#475569',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          Creator: 
                          <span style={{ color: '#0f172a', fontWeight: 500 }}>
                            {auction.creator}
                          </span>
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          mb: 1.5,
                          color: '#475569',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          Sport: 
                          <span style={{ color: '#0f172a', fontWeight: 500 }}>
                            {auction.sport}
                          </span>
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: '#475569',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          Venue: 
                          <span style={{ color: '#0f172a', fontWeight: 500 }}>
                            {auction.venue}
                          </span>
                        </Typography>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          )}

          {currentTab === 1 && (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              backgroundColor: '#f8fafc',
              borderRadius: '12px'
            }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                No past auctions found.
              </Typography>
            </Box>
          )}
        </Paper>

        <CreateButton
          variant="contained"
          onClick={handleCreateAuction}
        >
          <AddIcon />
        </CreateButton>
      </Container>
    </Box>
  );
};

export default AuctioneerDashboard; 