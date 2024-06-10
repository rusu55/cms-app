'use client';
import React from 'react'
import { gapi } from 'gapi-script'
import { Button } from '@/components/ui/button'

const page = () => {
    const calendarID = '99e814088bf29abfe5a8c443797d29387bc32e3713daa34b77b57e57750ed453@group.calendar.google.com'
    const apiKey = 'AIzaSyCCW9Vb_IydIeZbGo6hcx_jP5WIBCljo-s'
    const accessToken = 'ya29.a0AXooCgsrT9gkD00I4PklbnNmdqteEp6urtBIjkIZxzgX0LBDSy5Wrq0e8LVuMWDNoPH10Ymwh2HxL6kRd9EGSnvRiIavoMeoRzzZfTRsG6felNWdQt-xCVthmeVelyiUfAB19V92tJEeBF68nxMsrlSbX4-UZnFJiTYFaCgYKAf8SARMSFQHGX2Ming-OfdHrwkHT2oszR-FXRA0171'


    var event = {
        summary: 'Hello World',
        location: '',
        start: {
            dateTime: '2022-08-28T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: '2022-08-28T17:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
        attendees: [],
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
            ],
        },
    }

    const addEvent = (calendarID: any, event: any) => {
        console.log(event)
        function initiate() {
            gapi.client
                .request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                    method: 'POST',
                    body: event,
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then(
                    (response: any) => {
                        return [true, response]
                    },
                    function (err: any) {
                        console.log(err)
                        return [false, err]
                    }
                )
        }
        gapi.load('client', initiate)
    }
  return (
    <div><Button onClick={() => addEvent(calendarID, event)}>Add</Button></div>
  )
}

export default page