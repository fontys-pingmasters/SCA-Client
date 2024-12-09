import React from 'react';
import LiveMatchesList from '../components/LiveMatchList';
import { useNavigate } from 'react-router-dom';
import { BsFillCircleFill } from "react-icons/bs";

const LiveMatchesPage: React.FC = () => {
  return (
    <div className="p-4">
      <LiveMatchesList />
    </div>
  );
};

export default LiveMatchesPage;