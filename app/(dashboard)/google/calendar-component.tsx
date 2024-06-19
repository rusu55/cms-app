'use client'
import { ScheduleComponent, ViewsDirective, Inject, Day, WorkWeek, Month, Week, Agenda, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {useCallback, useState} from 'react';
import { getEvents } from "@/actions/GoogleEvent";


const Calendar = (accessToken: any) => {
let calendarId: string = '99e814088bf29abfe5a8c443797d29387bc32e3713daa34b77b57e57750ed453@group.calendar.google.com';
    let publicKey: string = 'AIzaSyCCW9Vb_IydIeZbGo6hcx_jP5WIBCljo-s';

    
    let dataManger: DataManager = new DataManager({
        url: 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?key=' + publicKey,
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
        
    });

 
    
    const onDataBinding = (e: Record<string, any>): void => {
       //console.log(e)
        let items: Record<string, any>[] = (e.result as Record<string, Record<string, any>[]>).items.filter((item) => item.status === 'confirmed');
        let scheduleData: Record<string, any>[] = [];
        if (items.length > 0) {
            for (let event of items) {
                console.log(event)
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
            //console.log(scheduleData)
        }
      
        e.result = scheduleData;

       
    }

    return (
        <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper drag-sample-wrapper'>
                    <div className="schedule-container">
                        <ScheduleComponent width='100%' height='650px'  eventSettings={{ dataSource: dataManger }} dataBinding={onDataBinding} currentView='Month' timezone='UTC'>
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
}

export default Calendar