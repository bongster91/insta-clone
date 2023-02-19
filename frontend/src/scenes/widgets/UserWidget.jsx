import { useSelector, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from '@mui/icons-material';
import {
    Box,
    Typography,
    Divider,
    useTheme,
} from '@mui/materials';

import UserImage from 'components/UserImage';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const UserWidget = ({ userId, picturePath }) => {
    const [ user, setUser ] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async() => {
        const response = await fetch(`http://localhost:3000/users/${userId}`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`},
            }
        );
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if(!user) return null;

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap='0.5rem'
                pb='1.1rem'
                onClick={() => navigate(`profile/${userId}`)}
            >
                <FlexBetween gap='1rem'>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant='h4'
                            color={dark}
                            fontWeight='500'
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}> {friends.length} </Typography>
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />
                {/* SECOND ROW */}

                
            </FlexBetween>
        </WidgetWrapper>
    );
};