'use client'
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { GoogleEvent } from "./component/googleEvent";
import { gapi } from "gapi-script";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import useAddClient from "../clients/hooks/use-add-client";
const PageCalendar = () => {
  
  //const user = await currentUser();
  //const userId: any = user?.id;
  const provider = "oauth_google";
  //const querys = useQueryClient(); 
 const u = useAddClient()
  
  //const response = await clerkClient.users.getUserOauthAccessToken(userId, provider)
  

  const calendarId = process.env.CALENDAR_ID;
  const apiKey = process.env.GOOGLE_API_KEY
  //const accessToken = response.data[0].token;

  // query google calendar
  
  
  return (
   

    <>
      {/*<GoogleEvent accessToken={accessToken} calendarId={calendarId} apiKey={apiKey} />*/}
    </>
  );
};

export default PageCalendar;
