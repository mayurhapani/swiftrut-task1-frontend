import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("medium");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const sendData = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/tasks/register`,
        {
          title,
          description,
          category,
          assignTo: selectedUserId,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      navigate("/addTask");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${BASE_URL}/users/getUser`, {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setUser(response.data.data);
        setSelectedUserId(response.data.data._id);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    };

    const selectUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/getAllUsers`, {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        // console.log(response);

        setUsers(response.data.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    };

    fetchUser();
    selectUser();
  }, [BASE_URL, navigate]);

  return (
    <div className=" bg-[url(./assets/images/main_bg.jfif)] bg-no-repeat bg-cover h-screen">
      <div className="container mx-auto ">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 p-10 rounded-md text-center w-2/3">
            <h2 className="mb-5 text-xl font-semibold text-gray-600">Add Your Tasks</h2>
            <form className="flex flex-col gap-2" onSubmit={sendData}>
              <input
                className="mb-3 p-2 rounded-sm "
                type="text"
                placeholder="Add Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="title"
              />
              <textarea
                className="mb-3 p-2 rounded-sm text-sm"
                type="text"
                rows={5}
                placeholder="Add description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                name="description"
              ></textarea>
              <select
                className="mb-3 p-2 rounded-sm"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              {user.role === "admin" && (
                <select
                  className="mb-3 p-2 rounded-sm"
                  value={selectedUserId}
                  onChange={(e) => {
                    setSelectedUserId(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select User
                  </option>
                  {users?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              )}

              <button className=" bg-blue-500 text-white rounded-md py-1 my-4" type="submit">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
