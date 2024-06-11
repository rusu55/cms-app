import React from "react";
import { GoogleEvent } from "./component/googleEvent";

import { currentUser, clerkClient } from "@clerk/nextjs/server";
const page = async () => {
  const user = await currentUser();

  const userId: any = user?.id;
  const provider = "oauth_google";
  const response = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );
  console.log(response);

  const calendarId = process.env.CALENDAR_ID;
  const accessToken = response.data[0].token;

  return (
    <>
      <GoogleEvent accessToken={accessToken} calendarId={calendarId} />
    </>
  );
};

export default page;
