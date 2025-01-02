import { IconButton, styled } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

interface ShowImageProps {
    image: string | null
    handleClearImage: () => void
    handleChangeImage?: (e: any) => Promise<void>;
}
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const ShowImage: React.FC<ShowImageProps> = ({ image, handleClearImage, handleChangeImage }) => {
    return (
        <>
            {image && (
                <div>
                    {image && (
                        <div style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
                            <img
                                src={image}
                                alt="Vista previa"
                                max-width='1920px'
                                max-height='1080px'
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                }}
                                onClick={handleClearImage}
                            >
                                <DeleteIcon />
                            </IconButton>
                            {
                                handleChangeImage && (
                                    <IconButton
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '60px',
                                            color: 'white',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        }}
                                        component="label"
                                        tabIndex={-1}
                                        color='inherit'
                                    >
                                        <ImageIcon />
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={handleChangeImage}
                                            multiple
                                        />
                                    </IconButton>
                                )
                            }
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ShowImage