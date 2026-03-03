import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/auth.service";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        if (!token) {
          setMessage("Invalid verification link");
          setLoading(false);
          return;
        }

        await verifyEmail(token);

        setMessage("Email verified successfully! Redirecting to login...");
        setLoading(false);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error: any) {
        setMessage(error.message);
        setLoading(false);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {loading ? <h2>Verifying...</h2> : <h2>{message}</h2>}
    </div>
  );
}