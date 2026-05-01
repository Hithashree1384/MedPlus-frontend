import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from "./config";

const VerifyServicePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search || "");
      const sessionId = params.get("session_id");

      // Handle cancel case
      if (location.pathname === '/service-appointment/cancel') {
        if (!cancelled) {
          navigate("/appointments?service_payment=Cancelled", { replace: true });
        }
        return;
      }

      // No session_id
      if (!sessionId) {
        if (!cancelled) {
          navigate("/appointments?service_payment=Failed", { replace: true });
        }
        return;
      }

      try {
        const res = await axios.get(
          `${API_BASE}/api/service-appointments/confirm`,
          {
            params: { session_id: sessionId },
            timeout: 15000,
          }
        );

        if (cancelled) return;

        if (res?.data?.success) {
          navigate("/appointments?service_payment=Paid", { replace: true });
        } else {
          navigate("/appointments?service_payment=Failed", { replace: true });
        }
      } catch (error) {
        console.error("Payment Verification Failed", error);
        if (!cancelled) {
          navigate("/appointments?service_payment=Failed", { replace: true });
        }
      }
    };

    verifyPayment(); // ✅ correct function call

    return () => {
      cancelled = true;
    };
  }, [location, navigate]);

  return null;
};

export default VerifyServicePayment;