import React from 'react';

interface ProfileHeaderProps {
  username: string;
  elo: number;
  className?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, elo, className }) => (
  <div className={`bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg flex items-center justify-between ${className}`}>
    <div className="flex items-center">
      <div className="bg-gray-200 rounded-full w-10 h-10 mr-4"></div> {/* Placeholder for profile picture */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-sm">{elo} ELO</p>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
