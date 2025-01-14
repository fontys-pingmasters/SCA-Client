import React, { useState, useEffect, useRef } from 'react';
import { IoMail } from "react-icons/io5";
import { useSignalRConnection } from "../SignalRContext";

const backendUrl = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`;

interface User {
  firstName: string;
  lastName: string;
  id: number;
}

interface InvitePlayerProps {
  onInvite: (opponentId: number) => void;
}

const InvitePlayer: React.FC<InvitePlayerProps> = ({ /*onInvite,*/ }) => {
  const connection = useSignalRConnection();
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchLoggedInUser();
  }, []);

  const fetchLoggedInUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${backendUrl}/User/Id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch matches.");
    }
    
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${backendUrl}/User/exceptcurrent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      },
    })
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleInvite = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${backendUrl}/Match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          opponent1Id: selectedUserId,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send match invitation.");
      }
  
      const data = await response.json(); 
      console.log("Match invitation sent successfully:", data);
  
      
      if (connection) {
        await connection.send("ReceiveMessage", data);
      }
    } catch (error) {
      console.error("Error sending match invitation:", error);
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
          className="bg-orange-500 text-white p-2 rounded-r-lg hover:opacity-80"
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