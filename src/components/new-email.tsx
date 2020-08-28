import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth } from "utils/nhost";

export function NewEmail() {
  const [progress, setProgress] = useState("LOADING");
  const { ticket } = useParams();

  useEffect(() => {
    const changeEmailHandler = async () => {
      try {
        await auth.changeEmailChange(ticket);
      } catch (error) {
        return setProgress("FAILED");
      }
      return setProgress("COMPLETED");
    };
    changeEmailHandler();
  }, [ticket]);

  return <div>{progress}</div>;
}
