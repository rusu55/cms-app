"use client";
import { gapi } from "gapi-script";
export const deleteGoogleCalendar = (
  accessToken: string,
  calendarId: string,
  eventId: string
) => {
  let data: any;
  const initiate = async () => {
    gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response: any) => {
          //console.log(response);
          //setId(response.result.id);
          return [true, response];
        },
        function (err: any) {
          console.log(err);
          return [false, err];
        }
      );
  };
  gapi.load("client", initiate);
  return data;
};
