import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Drawer } from '@mui/material';
import { api } from '../utils/authInstance';

type Tprops = {
    userId: number;
}

type TDailisInfo = {
    id: number;
    createdAt: string;
    events: {
        id: number;
        description: string;
    }[] | null
}

function Daily(props: Tprops) {
    const {userId} = props

    const [Dailies, setDailies] = useState<TDailisInfo[]>([]);
    const [OpenToggle, setOpenToggle] = useState(false);
    const [CurrOpenDaily, setCurrOpenDaily] = useState<TDailisInfo | null>(null);
    console.log(Dailies)
    useEffect(() => {
        api().get(`/dailies/getDailies/${userId}`)
            .then(res => {
                setDailies(res.data.dailyData)
            }).catch(Error => {
                console.log(Error)
        });
    }, [userId])

    const toggleDrawer = (open: boolean, dailiy?: any) => 
        (e: React.KeyboardEvent | React.MouseEvent) => {
            if(e.type === 'keydown' && (
                (e as React.KeyboardEvent).key === 'Tab' ||
                    (e as React.KeyboardEvent).key === 'Shift'
            )) {
            return;
            }
            if(dailiy) {
                setCurrOpenDaily(dailiy);
            }
            setOpenToggle(open);
    };

    const renderDaily = Dailies.map((daily, i) => {
        return (
            <Grid item xs={12/7} key={i}>
                <Box>
                    <Paper style={{maxWidth: '130px', minHeight: '130px', margin: 0}} elevation={3} onClick={toggleDrawer(true, daily)}>
                        <p>{daily.id}</p>
                        <p>{daily.createdAt}</p>
                    </Paper>
                </Box>
                
            </Grid>
        );
    });

    return (
        <Grid style={{display: 'flex', alignItems: 'center'}} container spacing={2}>
            
                {renderDaily}

                <Drawer
                    anchor='right'
                    open={OpenToggle}
                    onClose={toggleDrawer(false, CurrOpenDaily)}
                >
                    <Box
                        sx={{ width: 400 }}
                    >
                        <p>{CurrOpenDaily?.id}</p>
                        <p>{CurrOpenDaily?.createdAt}</p>
                        <div>
                            {CurrOpenDaily?.events?.map((event, i) => {
                                return (<p key={i}>{event.description}</p>)
                            })}
                        </div>
                    </Box>
                </Drawer>
        </Grid>
    );
};

export default Daily