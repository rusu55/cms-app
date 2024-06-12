"use client";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Button } from "@/components/ui/button";
import {format} from 'date-fns'

export const GoogleEvent = ({ accessToken, calendarId, apiKey }: any) => {
 
  const [events, setEvents] = useState([])
  
/*
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
*/
  
     function initiate() {
      gapi.client
          .init({
              apiKey: apiKey,
          })
          .then(function () {
              return gapi.client.request({
                  path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
              })
          })
          .then(
              (response: any) => {
                  let events = response.result.items                 
                 setEvents(events)
                 return events;
              },
              function (err: any) {
                  return [false, err]
              }
          )
  }    
  

  const addEvent = () => {    
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

  useEffect(()=>{    
      gapi.load('client', initiate)    
  },[])
  console.log('data:', format(events[0].created, 'MM-dd-yyyy'))
  return (
    <div>
      <Button onClick={() => addEvent()}>Add Event</Button>      
    </div>
  );
};
