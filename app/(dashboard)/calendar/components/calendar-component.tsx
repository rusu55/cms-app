'use client'
import {useEffect, useState} from 'react';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,  
  ViewsDirective,
  ViewDirective,  
} from "@syncfusion/ej2-react-schedule";

import { registerLicense } from "@syncfusion/ej2-base";
import { getGoogleCalendar } from '@/actions/getGoogleCalendar';
import { addGoogleCalendar } from '@/actions/addGoogleCalendar';

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfcHRdRGNfVERzXkQ="
);

export const CalendarComponent =  ({
  accessToken,
  calendarId,
  apiKey
}: {
  accessToken: string;
  calendarId: string | any;
  apiKey: string | any
}) => {
  
  const [events, setEvents] = useState<any>()

 useEffect(()=>{
     getGoogleCalendar(apiKey, calendarId, setEvents)     
    }, [])
  

    const onActionComplete = (args: any): void => {
      if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved') {
         
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
          
          addGoogleCalendar(accessToken, calendarId, apiKey, event)
      }
    }

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
