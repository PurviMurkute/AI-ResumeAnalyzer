import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { LuLoaderCircle } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GoogleLogin = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("JWT", token);

        try {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/auth/current-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            login(res.data.data, token);
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }
        } catch (error) {
          console.log("error in googlesuccess", error);

          toast.error(error?.message);
        }
      }
    };

    handleAuth();
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center h-screen space-y-4">
  <LuLoaderCircle className="w-8 h-8 animate-spin"/>
  <p className="font-medium">Logging you in...</p>
    </div>
  );
};

export default GoogleLogin;