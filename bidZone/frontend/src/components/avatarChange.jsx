import api from "../services/api";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

function AvatarChange({avatarPopup, avatarChangeState, setAvatarChangeState}) {
  const { user, loading, loadUser } = useAuth();
  const [avatar, setAvatar] = useState(null);

  //   changeAvatar function
  async function changeAvatar(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    toast.remove();
    try {
      const response = await api.put("users/avatar", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success(response.data.message);
      await loadUser();

      setAvatarChangeState(false);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message || "Avatar update failed");
    }
  }
  return (
    <>
      {avatarChangeState && (
        <>
          <div
            className="fixed w-screen bg-[#040b1c96] h-screen top-0 left-0 flex items-center justify-center"
            onClick={avatarPopup}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-[#0e182e] p-5 rounded-lg relative"
            >
              <button
                type="button"
                className="sec-text-color absolute bottom-73 left-80 cursor-pointer"
                onClick={avatarPopup}
              >
                <IoCloseSharp size={24} />
              </button>
              <h3 className="text-xl uppercase">Change Avatar</h3>
              <p className="sec-text-color pb-5 font-medium">
                Choose a new profile picture
              </p>
              <form onSubmit={changeAvatar}>
                <label
                  htmlFor="user-avatar"
                  className="cursor-pointer border-2 p-3 rounded-lg block text-center border-dashed border-[#472f99]"
                >
                  <IoCloudUploadOutline
                    size={40}
                    color="#ad7ff5"
                    className="m-auto"
                  />
                  ClicK to upload
                </label>

                <input
                  type="file"
                  name="avatar"
                  id="user-avatar"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  required
                  className="primary-text-color"
                />
                <button
                  type="submit"
                  className="border-2 border-[#472f99] rounded-xl py-2 px-5 block my-3 mt-5 m-auto cursor-pointer primary-text-color"
                >
                  Change
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AvatarChange;
