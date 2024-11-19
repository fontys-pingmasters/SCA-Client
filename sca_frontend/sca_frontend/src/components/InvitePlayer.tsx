import React, { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  id: number;
}

interface InvitePlayerProps {
  onInvite: (opponentId: number) => void;  // Expect a number (ID)
  className?: string; // dont import styling, not a component lib
  users: User[]; // List of users passed as props
}

const InvitePlayer: React.FC<InvitePlayerProps> = ({ onInvite, className, users }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);  // Store user ID

  // !out of experience, make this update every few keystrokes or a couple seconds after last keystroke, slow machines wont run this well
  // Handle input change and filter users
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
      // Filter users based on the input
      const filtered = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  // Handle selecting a user
  const handleSelectUser = (user: User) => {
    setSelectedUserId(user.id);  // Save the user ID instead of full name
    setSearchInput(`${user.firstName} ${user.lastName}`); // Update the input with the full name
    setFilteredUsers([]); // Clear the filtered list
    //maybe just handle with clickoff instead of setting filtered users to empty array Or test for click on this object to disable it when selection is made -> instead of clearing array stop handling this
  };

  const handleInvite = () => {
    if (selectedUserId !== null) {
      onInvite(selectedUserId);  // Pass the user ID to onInvite
      // !wrong, not on homepage, handle here instead of passing
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="text-lg font-semibold mb-2">Invite Player</h3>
      <div className="flex items-center w-full relative">
        <input
          type="text"
          placeholder="Search opponent"
          value={searchInput}
          onChange={handleSearchChange}
          className="flex-1 p-2 rounded-l-lg border text-slate-900 border-gray-300"
        />
        <button
          onClick={handleInvite}
          className="bg-orange-500 text-white p-2 rounded-r-lg"
        >
          📧 {/* Dont use emoji, use icon instead */}
        </button>


        {/* !weird handling of wether this is being used, I think TS has access over an object active state variable, not sure. would be something like isActive(objectId{you set this yourself}) i think, if it doesnt exist, nvm */}
        {/* Render the filtered users in a dropdown */}
        {filteredUsers.length > 0 && (
          <ul className="absolute bg-gray-800 border border-gray-300 w-full mt-1 rounded-lg max-h-40 overflow-y-auto z-10">
            {filteredUsers.map((user) => (
              <li
                key={user.id}  // Use user.id for the key
                onClick={() => handleSelectUser(user)}  // Pass user object to handleSelectUser
                // onFocus={} this could be helpful here to display and undisplay the dropdown
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
