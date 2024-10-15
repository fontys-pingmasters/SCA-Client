import React from 'react';

interface ProfileHeaderProps {
  username: string;
  elo: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, elo }) => (
  <div className="flex flex-col items-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg mb-4">
    <h2 className="text-xl font-semibold">{username}</h2>
    <p className="text-sm">{elo} ELO</p>
  </div>
);

export default ProfileHeader;
