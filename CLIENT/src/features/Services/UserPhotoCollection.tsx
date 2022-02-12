import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, MobileStepper, Button, useTheme } from "@mui/material";




import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { photos } from "../../app/models/Photo";
import { useState } from "react";



const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Props {
    userPhotos: photos[] | null
}


export default function UserPhotoCollection({ userPhotos }: Props) {



    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = userPhotos!?.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const theme = useTheme();


    return (
        <>
            <Box sx={{ maxWidth: 620, flexGrow: 1, margin: 3 }}>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {userPhotos?.map((image, index) => (
                        <div key={image.id}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        height: 325,
                                        display: 'block',
                                        maxWidth: 620,
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    src={image.url}
                                   
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </>
    )
}