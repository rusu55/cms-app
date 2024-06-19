'use client';
import { gapi } from "gapi-script";
export const getGoogleCalendar = (apiKey: string, calendarId: string, setEvents: any) => {
    
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
       gapi.load("client", initiate);  
}
