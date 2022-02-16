import { Button, Avatar, Grid, Typography, Container, Box, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { Service } from "../../app/models/Service";



interface Props {
    service: Service;
}

export default function ServiceCard({ service }: Props) {
    const theme = useTheme();
    const screenMatches = useMediaQuery(theme.breakpoints.down('sm'));



    const cardforSMscreen = (
        <>






            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row' },
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: 1,
                    fontWeight: 'bold',
                    margin: '8px',

                }}
            >
                <Box
                    component="img"
                    sx={{
                        maxHeight: { xs: 100 },
                        maxWidth: { xs: 100 },
                    }}
                    alt="The house from the offer."
                    src={service.photoUrl}
                />
                <Box sx={{ mr: 3 }} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'flex-start' },
                        // m: 3,
                        minWidth: { xs: 250 },
                    }}
                >
                    <Box component="span" sx={{ fontSize: 12, mt: 1 }}>
                        123 Main St, Phoenix AZ
                    </Box>
                    <Box component="span" sx={{ color: 'primary.main', fontSize: 15 }}>
                        $280,000 — $310,000
                    </Box>
                    <Box
                        sx={{
                            mt: 1.5,
                            p: 0.5,
                            borderRadius: '5px',
                            color: 'primary.main',
                            fontWeight: 'medium',
                            display: 'flex',
                            fontSize: 12,
                            alignItems: 'center',
                            '& svg': {
                                fontSize: 21,
                                mr: 0.5,
                            },
                        }}
                    >
                        CONFIDENCE SCORE 85%
                    </Box>
                </Box>
            </Box>
        </>
    )

    const cardforMDscreen = (
        <>

            <Container 
            style={{ margin: '8px',
             borderRadius: '20px', display: 'inline-block', 
             width: '250px', background: 'white' }}>
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper'
                    }}
                >
                    <Avatar src={service.photoUrl} sx={{ width: 100, height: 100 }} />
                    <Typography component="h1" variant="body2" style={{ padding: 0, marginTop: '5px' }}>
                        {service.firstName} {service.lasttName}
                    </Typography>
                    <Typography component="h1" variant="body2" style={{ padding: 0 }}>
                        {service.city}
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
    return (
        <>
            {screenMatches ? cardforSMscreen : cardforMDscreen}
        </>
    )
}