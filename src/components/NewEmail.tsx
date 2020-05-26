import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../nhost";

const NewEmailContainer = styled.div``;

export interface INewEmailProps {}

export function NewEmail(props: INewEmailProps) {
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

  return <NewEmailContainer>{progress}</NewEmailContainer>;
}
