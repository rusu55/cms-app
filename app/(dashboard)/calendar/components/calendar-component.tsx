"use client";
import * as React from "react";
import { useEffect, useState } from "react";

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

import { appData } from "../datasource";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfcHRdRGNfVERzXkQ="
);

/**
 * Schedule realtime binding sample
 */

export const CalendarComponent = ({
  accessToken,
  calendarId,
}: {
  accessToken: string;
  calendarId: string;
}) => {
  //const eventSettings = { dataSource: appData };

  var event = {
    summary: "Hello World RB Studio",
    location: "",
    start: {
      dateTime: "2024-04-28T09:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2024-04-28T17:00:00-07:00",
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

  const [currentView, setCurrentView] = useState<View>("Week");
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({});

  let publicKey: string = "AIzaSyACAjPZk4ixmn4uh6NsmR8QEsN1t2We0fY";

  useEffect(() => {
    const getData = async () => {
      let dataManger: DataManager = new DataManager({
        url:
          "https://www.googleapis.com/calendar/v3/calendars/" +
          calendarId +
          "/events?key=" +
          publicKey,
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      });
      setEventSettings({ dataSource: dataManger });
    };
    getData();
  }, []);

  const onCreated = () => {
    console.log("clicked");
    //console.log(accessToken);
    console.log(eventSettings);
  };

  const onNavigating = (args: NavigatingEventArgs): void => {
    console.log("Navigate: ", args);
  };

  const onActionComplete = (args: any): void => {
    if (args.requestType === "eventCreated") {
    }
  };

  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            height="550px"
            selectedDate={new Date()}
            actionComplete={onActionComplete}
            navigating={onNavigating}
            currentView={currentView}
            eventSettings={eventSettings}
            created={onCreated}
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};
