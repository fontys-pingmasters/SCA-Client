import React from 'react';
import LogoutButton from './LogoutButton';

interface ProfileHeaderProps {
  username: string | undefined;
  elo: number;
  className?: string; // dont import styling, were not making a component lib
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, elo, className /* dont import styling, not making a component lib */ }) => (
  <div className={`bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg flex items-center justify-between ${className}`}>
    <div className="flex items-center">
      <div className="bg-gray-200 rounded-full w-10 h-10 mr-4"></div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-sm">{elo} ELO</p>
      </div>
    </div>
    <LogoutButton />
  </div>
);

export default ProfileHeader;
