import { Box } from '@mui/material';
import { apiURL } from '../Util/apiURL';

const UserImage = ({ image, size='60px' }) => {
    const API = apiURL();

    return (
        <Box width={size} height={size}>
            <img 
                style={{
                    objectFit: 'cover',
                    borderRadius: '50%'
                }}
                width={size}
                height={size}
                alt='user'
                src={`${API}/assets/${image}`}
            />
        </Box>
    );
};

export default UserImage;