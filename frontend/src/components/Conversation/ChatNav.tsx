import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Image from 'next/image';

interface ChatNavProps {
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatNav = ({ setIsSidebarOpened }: ChatNavProps) => {

  const openSidebar = () => {
    setIsSidebarOpened((prev) => !prev);
  }

  return (
    <div className="flex items-center justify-between space-x-2 w-full gap-2">
      <div className="flex items-center space-x-2">
        <Image src="/user.png" alt="logo" width={48} height={48} />
        <span className="bodyLarge">Chatbot</span>
      </div>
      <div className='block md:hidden'>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={openSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </div>

    </div>
  );
}

export default ChatNav;