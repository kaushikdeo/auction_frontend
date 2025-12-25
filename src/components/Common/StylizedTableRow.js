import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#27272a', // Zinc 800
      color: '#fafafa', // Zinc 50
      borderBottom: '1px solid #3f3f46',
      textTransform: 'uppercase',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      color: '#f4f4f5', // Zinc 100
      borderBottom: '1px solid #3f3f46',
      fontFamily: 'Inter, sans-serif',
    },
  }));
  
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.04) !important',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
