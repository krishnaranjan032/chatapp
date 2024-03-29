import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react"; // Assuming you are still using Chakra UI for toast notifications
import ChatLoading from "../ChatLoading";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/solid"; // Assuming you are using Hero Icons for icons
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white w-full p-2">
        <button className="text-blue-500" onClick={onOpen}>
          <i className="fas fa-search"></i>
          <span className="hidden md:flex ml-2">Search User</span>
        </button>
        <h1 className="text-2xl font-semibold">Talk-A-Tive</h1>
        <div className="relative">
          <button className="flex items-center">
            <NotificationBadge count={notification.length} effect={Effect.SCALE} />
            <BellIcon className="h-6 w-6 text-gray-700" />
          </button>
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded shadow-lg">
            <ul>
              {!notification.length && <li className="py-2 px-4">No New Messages</li>}
              {notification.map((notif) => (
                <li key={notif._id} className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}>
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative">
          <button className="flex items-center">
            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
            <ChevronDownIcon className="h-6 w-6 text-gray-700" />
          </button>
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded shadow-lg">
            <ul>
              <ProfileModal user={user}>
                <li className="py-2 px-4 cursor-pointer">My Profile</li>
              </ProfileModal>
              <hr className="border-t my-2" />
              <li className="py-2 px-4 cursor-pointer" onClick={logoutHandler}>Logout</li>
            </ul>
          </div>
        </div>
      </div>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <div className="flex pb-2">
              <input
                type="text"
                className="border rounded py-1 px-2 mr-2"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={handleSearch}>Go</button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner className="ml-auto" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
