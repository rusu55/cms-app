"use client";
import { useEffect } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  Inject,
  Day,
  WorkWeek,
  Month,
  Week,
  Agenda,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfcHRdRGNfVERzXkQ="
);

const page = () => {
  let calendarId: string =
    "99e814088bf29abfe5a8c443797d29387bc32e3713daa34b77b57e57750ed453@group.calendar.google.com";
  let publicKey: string = "AIzaSyACAjPZk4ixmn4uh6NsmR8QEsN1t2We0fY";
  let dataManger: DataManager = new DataManager({
    url:
      "https://www.googleapis.com/calendar/v3/calendars/" +
      calendarId +
      "/events?key=" +
      publicKey,
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  const onDataBinding = (e: Record<string, any>): void => {
    let items: Record<string, any>[] = (
      e.result as Record<string, Record<string, any>[]>
    ).items;
    let scheduleData: Record<string, any>[] = [];
    console.log(items);
    if (items.length > 0) {
      for (let event of items) {
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
          IsAllDay: !event.start.dateTime,
        });
      }
    }
    e.result = scheduleData;
  };
  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper drag-sample-wrapper">
          <div className="schedule-container">
            <ScheduleComponent
              width="100%"
              height="650px"
              readonly={false}
              eventSettings={{ dataSource: dataManger }}
              dataBinding={onDataBinding}
              currentView="Month"
              timezone="UTC"
            >
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
