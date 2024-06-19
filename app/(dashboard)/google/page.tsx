
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import Calendar from "./calendar-component";

const PageGoogle = async () => {
    
  const user = await currentUser();
  const userId: any = user?.id;
  const provider = "oauth_google";
  const response = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );
  const accessToken = response.data[0].token;
  console.log(accessToken)

  return (
    <Calendar accessToken={accessToken} />
  )
}

export default PageGoogle