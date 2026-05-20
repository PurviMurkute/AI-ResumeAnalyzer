import axios from "axios";
import { useEffect, useRef, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { LuLoaderCircle } from "react-icons/lu";
import { AuthContext } from "../context/AuthContext";

const GoogleLogin = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");

        if (!token) {
          navigate("/");
          return;
        }

        localStorage.setItem("JWT", token);

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

          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Google login error:", error);

        toast.error("Authentication failed");

        navigate("/");
      }
    };

    handleAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <LuLoaderCircle className="w-8 h-8 animate-spin text-cyan-600" />

      <p className="font-medium text-gray-700">
        Logging you in...
      </p>
    </div>
  );
};

export default GoogleLogin;