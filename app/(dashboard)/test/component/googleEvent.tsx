"use client";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { ScheduleComponent, ViewsDirective, Inject, Day, WorkWeek, Month, Week, Agenda, ViewDirective } from '@syncfusion/ej2-react-schedule';

export const GoogleEvent = ({ accessToken, calendarId, apiKey }: any) => {
 
  const [events, setEvents] = useState<any>([])
  
    /* ---------------------------- Create EVENT TO GOOGLE -----------------------   */
    const pushEvent = (accessToken: string, calendarId: string, apiKey: string, event: object) => {
      console.log(accessToken)
      console.log(calendarId)
      console.log(apiKey)
      const initiate = () =>{
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
   }
  

   /* ------------------------------ GET DATA ------------------------------------ */
     const initiate =() => {
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
                let scheduleData: Record<string, any>[] = [];
                  let events = response.result.items.filter((event: any) => event.status === 'confirmed') 
                  console.log(events)
                  if (events.length > 0){
                    for (let event of events){
                        let when: string = event.start.dateTime as string;
                        let start: string = event.start.dateTime as string;
                        let end: string = event.end.dateTime as string;
                          if (!when) {
                            when = event.start.date as string;
                            start = event.start.date as string;
                            end = event.end.date as string;
                         }
                        scheduleData.push({
                          Id: event.id,
                          Subject: event.summary,
                          StartTime: new Date(start),
                          EndTime: new Date(end),
                          IsAllDay: !event.start.dateTime
                        });
                      }
                    }
                    setEvents(scheduleData)    
                  },                  
              function (err: any) {
                  return [false, err]
              }
          )
     }    
  
  useEffect(()=>{    
       gapi.load('client', initiate) 
         
  },[])

/* ------------------------- CREATE EVENT ----------------------------------- */
const onActionComplete = (args: any): void => {
  if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved') {
      console.log(args)
      const {Description, EndTime, EndTimezone, Id, IsAllDay, Location, StartTime, StartTimezone, Subject} = args.data[0];

      const event = {
        summary: Subject,
        status: "confirmed",
        location: Location,
        start: {
          dateTime: StartTime.toISOString(),
          timeZone: "America/Chicago",
        },
        end: {
          dateTime: EndTime.toISOString(),
          timeZone: "America/Chicago",
        },
        description: Description,   
      };
      console.log(event)
      pushEvent(accessToken, calendarId, apiKey, event)
  }
}
 
//console.log('data:', format(events[0].created, 'MM-dd-yyyy'))
  return (
    <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper drag-sample-wrapper'>
                    <div className="schedule-container">
                        <ScheduleComponent width='100%' height='650px' eventSettings={{ dataSource: events }} actionComplete={onActionComplete} currentView='Month' timezone='UTC'>
                            <ViewsDirective>
                                <ViewDirective option='Day' />
                                <ViewDirective option='Week' />
                                <ViewDirective option='WorkWeek' />
                                <ViewDirective option='Month' />
                                <ViewDirective option='Agenda' />
                            </ViewsDirective>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                        </ScheduleComponent>
                    </div>
                </div>
            </div>
        </div>
  );
};
