import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { GoogleEvent } from "./component/googleEvent";
import { gapi } from "gapi-script";

const PageCalendar = async () => {
  const user = await currentUser();
  const userId: any = user?.id;
  const provider = "oauth_google";
  console.log(user)
  
  const response = await clerkClient.users.getUserOauthAccessToken(userId, provider)
  

  const calendarId = process.env.CALENDAR_ID;
  const apiKey = process.env.GOOGLE_API_KEY
  const accessToken = response.data[0].token;

  // query google calendar
  
  
  return (
    <>
      <GoogleEvent accessToken={accessToken} calendarId={calendarId} apiKey={apiKey} />
    </>
  );
};

export default PageCalendar;
