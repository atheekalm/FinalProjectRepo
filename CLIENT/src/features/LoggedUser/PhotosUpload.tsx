import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

export default function PhotosUpload() {
    const Input = styled('input')({
        display: 'none',
    });
    return (
        <>
            <Container component="form">
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            </Container>
        </>
    )
}