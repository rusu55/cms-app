'use client';
import { useState, useEffect } from "react";
import { gapi } from "gapi-script";

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

  export const createEvent = (accessToken: string, calendarId: string, event: Object) => {    
    

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

 export const getEvents = async (apiKey: string, calendarId: string)  =>{

    const [events, setEvents] = useState([]);

   useEffect(()=>{
     gapi.load("client", Initiate);
    }, [])
    
      const Initiate = async () => {

         gapi.client
          .init({
              apiKey: apiKey,
              showDeleted: false             
          })
          
          .then(function () {
              return  gapi.client.request({
                  path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
                  params: {
                    'showDeleted': false
                  }
              })
          })
          .then(
               (response: any) => {                            
               setEvents(response.result.items )              
              },
              function (err: any) {
                  return [false, err]
              }
          )              
  };
  
   
  
 return events
}    

