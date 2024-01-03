import React, { useState } from "react";
import { Drawer, Box, Typography } from '@mui/material'

const DrawerComponent = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true)
    return (
        <Drawer anchor="left" open={isDrawerOpen} onClose={setIsDrawerOpen(false)}>
            <Box p={2} width='250' textAlign="center" role="presentation">
                <Typography variant="h6" component="div">Side Bar</Typography>
            </Box>
        </Drawer>
    )
}

export default DrawerComponent;