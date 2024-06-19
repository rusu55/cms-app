"use client";
import { gapi } from "gapi-script";
export const updateGoogleCalendar = (
  accessToken: string,
  calendarId: string,
  apiKey: string,
  event: Object,
  eventId: string,
  setId: any
) => {
  let data: any;
  const initiate = async () => {
    gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
        method: "PUT",
        body: event,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response: any) => {
          // setId(response.result.id);
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
