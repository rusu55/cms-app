"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import {format} from 'date-fns'
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
  ActionEventArgs,
  NavigatingEventArgs,
  View,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";


import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfcHRdRGNfVERzXkQ="
);
import {scheduleData} from '../dataSource';


export const CalendarComponent = ({
  accessToken,
  calendarId,
  apiKey
}: {
  accessToken: string;
  calendarId: string | any;
  apiKey: string | any
}) => {
  

  
//console.log(new Date(2019, 0, 3, 9, 30))
  const [currentView, setCurrentView] = useState<View>("Month");
  const [events, setEvents] = useState({})
  
  //const [eventSettings, setEventSettings] = useState<EventSettingsModel>({});

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

  function getEvents() {
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
                let formatedData: any = []
                const formated = events.map((event: any)=> {
                  const {id, summary, description, location, start, end} = event
                  //const {date} = start
                  const Id = id
                  const Subject = summary
                  const Description = description
                  const Location = location
                  const StartTime = new Date(2024, 6, 9, 9, 30)
                  const EndTime = new Date(2024, 6, 9, 10, 30)
                  return({...formatedData, Id, Subject, Description, Location, StartTime, EndTime})
                }
                )
                console.log(events) 
                console.log(formated)             
              setEvents({dataSource: formatedData})
               return events;
            },
            function (err: any) {
                return [false, err]
            }
        )
}    

function createEvent(){
  
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

useEffect(()=>{   
 gapi.load('client', getEvents)
 setEvents({dataSource: scheduleData})    
},[])


//console.log('data:', format(events[0].created, 'MM-dd-yyyy'))
  const onCreated = () => {
    //gapi.load('client', getEvents)
  };

  const onNavigating = (args: NavigatingEventArgs): void => {
    console.log("Navigate: ", args);
    if (args.action == 'view'){
      //const eventSetting = {dataSource: scheduleData}
    }
  };

  const onActionComplete = (args: any): void => {
   
    if (args.requestType === "eventCreated") {
      console.log(args)
      const {data} = args
      /*
       event = {
        summary: data[0].Subject,
        location: data[0].Location,
        start: data[0].StartTime,
        end: data[0].EndTime,
        description: data[0].Description,
      }
      */
      } 
     // gapi.load("client", createEvent);
    }
  
  
  //const eventSetting = {dataSource: scheduleData}
  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            height="550px"
            selectedDate={new Date()}
            actionComplete={onActionComplete}           
            currentView={currentView}
            eventSettings={events}
            
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};
