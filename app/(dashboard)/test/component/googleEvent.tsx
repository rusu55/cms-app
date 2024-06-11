"use client";

import { gapi } from "gapi-script";
import { Button } from "@/components/ui/button";

export const GoogleEvent = ({ accessToken, calendarId }: any) => {
  console.log(accessToken);
  var event = {
    summary: "Hello World",
    location: "",
    start: {
      dateTime: "2024-08-28T09:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2024-08-28T17:10:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  const addEvent = () => {
    console.log(event);
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response: any) => {
            return [true, response];
          },
          function (err: any) {
            console.log(err);
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };

  return (
    <div>
      <Button onClick={() => addEvent()}>Add Event</Button>
    </div>
  );
};
