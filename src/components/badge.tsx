import { useState } from 'react';
type Props = {
  userName: string;
  userEmail: string;
  userAvatar: string;
  userState: 'online' | 'offline';
};

const Badge = (props: Props) => {
  const { userName, userEmail, userAvatar, userState } = props;
  const [isHovered, setIsHovered] = useState(false);
  const show = () => {
    setIsHovered(true);
  };
  const hide = () => {
    setIsHovered(false);
  };
  return (
    <div className="">
      <div className="relative" onMouseOver={show} onMouseLeave={hide}>
        <img id="badge" className="rounded-full w-8 h-8" src={userAvatar} alt={userName} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${userState === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
        {isHovered && (
          <div id="badge-info" className="absolute z-10 w-fit px-[5px] py-[2px] bg-black text-white text-xs right-0">
            <div>{userName}</div>
            <div>{userEmail}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Badge;
