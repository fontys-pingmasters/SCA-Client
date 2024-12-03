import React, { useState, useEffect, useRef } from 'react';
import { IoMail } from "react-icons/io5";

interface User {
  firstName: string;
  lastName: string;
  id: number;
}

interface InvitePlayerProps {
  onInvite: (opponentId: number) => void;
  users: User[];
}

const InvitePlayer: React.FC<InvitePlayerProps> = ({ /*onInvite,*/ users }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value) {
        const filtered = users.filter(
          (user) =>
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
        setIsDropdownActive(true);
      } else {
        setFilteredUsers([]);
        setIsDropdownActive(false);
      }
    }, 300);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUserId(user.id);
    setSearchInput(`${user.firstName} ${user.lastName}`);
    setIsDropdownActive(false);
  };

  const handleInvite = () => {
    if (selectedUserId !== null) {
      console.log(`Invited player with ID: ${selectedUserId}`);
    } else {
      console.error("No player selected to invite.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center dropdown-container">
      <h3 className="text-lg font-semibold mb-2">Invite Player</h3>
      <div className="flex items-center w-full relative">
        <input
          type="text"
          placeholder="Search opponent"
          value={searchInput}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownActive(true)}
          className="flex-1 p-2 rounded-l-lg border text-gray-400"
        />
        <button
          onClick={handleInvite}
          className="bg-orange-500 text-white p-2 rounded-r-lg"
        >
          <IoMail size={25} />
        </button>

        {isDropdownActive && filteredUsers.length > 0 && (
          <ul className="absolute bg-gray-800 border border-gray-300 w-full mt-1 rounded-lg max-h-40 overflow-y-auto z-10">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InvitePlayer;