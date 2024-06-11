import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { CalendarComponent } from "./components/calendar-component";

const PageCalendar = async () => {
  const user = await currentUser();
  const userId: any = user?.id;
  const provider = "oauth_google";
  const response = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );

  const calendarId =
    "99e814088bf29abfe5a8c443797d29387bc32e3713daa34b77b57e57750ed453@group.calendar.google.com";
  const accessToken = response.data[0].token;
  return (
    <>
      <CalendarComponent accessToken={accessToken} calendarId={calendarId} />
    </>
  );
};

export default PageCalendar;
