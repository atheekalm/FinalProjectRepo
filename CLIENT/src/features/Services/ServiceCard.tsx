import { Button, Avatar, Grid, Typography, Container, Box, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import { Service } from "../../app/models/Service";


interface Props {
    service: Service;
}

export default function ServiceCard({ service }: Props) {



    return (
        <>

            <Container component="main" maxWidth="xs" style={{ borderRadius: '20px', display: 'inline-block', width: '250px', backgroundColor: '#dfe3eb' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={service.photoUrl} sx={{ width: 100, height: 100 }} />
                    <Typography component="h1" variant="subtitle2" style={{ fontWeight: 'bold', fontSize: '17px' }}>
                        { }
                    </Typography>
                    <Typography component="h1" variant="caption" style={{ marginBottom: 5, padding: 0 }}>
                        Software Engineer
                    </Typography>
                    <Grid item={true} container style={{ marginBottom: '1rem', padding: 0 }} >
                        <Grid item xs textAlign={'center'}>
                            <Typography variant="h5">123</Typography>
                            <Typography variant="caption">Tasks</Typography>
                        </Grid>
                        <Grid item xs textAlign={'center'}>
                            <Typography variant="h5">850</Typography>
                            <Typography variant="caption">Views</Typography>
                        </Grid>
                        <Grid item xs textAlign={'center'}>
                            <Typography variant="h5">850</Typography>
                            <Typography variant="caption">Views</Typography>
                        </Grid>
                    </Grid>
                    <Button component={Link} to={`/Service/${service.id}`} variant="outlined">View Profile</Button>
                    <br />
                </Box>
            </Container>



        </>
    )
}