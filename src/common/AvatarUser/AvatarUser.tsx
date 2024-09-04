import { styled } from '@mui/material/styles';
import { Badge, Avatar, CardHeader } from "@mui/material";

import './styles.css';
import { AvatarUserProps } from "./interfaces";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    marginTop: -20,
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const AvatarUser = ({ name }: AvatarUserProps) => {
  return (
    <div className="avatarUser__root">
      <CardHeader
          className="avatarUser__card"
          avatar={
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              variant="dot"
            >
              <Avatar alt={name}  />
            </StyledBadge>
          }
          title={name}
        />
    </div>
  );
}

export default AvatarUser;