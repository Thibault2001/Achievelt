import React, {useEffect} from 'react';
import { auth, db, ref, onValue } from './firebase';
import { toast } from 'react-toastify';

const Reminders = () =>
{
    useEffect(() =>
    {
        const checkReminders = async () =>
        {
            console.log("Checking reminder");
            const user = auth.currentUser;
            if(user)
            {
                const userID = user.uid;
                const eventRef = ref(db, `calendar/${userID}/events`);

                onValue(eventRef, (snapshot) => 
                {
                    const events = snapshot.val();
                    if(events)
                    {
                        const currentTime = new Date();

                        Object.keys(events).forEach(eventID => 
                            {
                                const eventData = events[eventID];
                                const {eventDate, eventTime, reminderTime, eventTitle, eventDescription } = eventData;

                                const eventDateTime = new Date(`${eventDate} ${eventTime}`);

                                const reminderDateTime = new Date(eventDateTime.getTime() - reminderTime * 60000);

                                if(currentTime >= reminderDateTime) 
                                {
                                   toast.info(`Reminder: ${eventTitle} on ${eventDate} at ${eventTime}`, { autoClose: 20000});
                                }
                            });
                    }
                });
            }
        };

        checkReminders();

        const reminderInterval = setInterval(checkReminders, 60000);

        return () => clearInterval(reminderInterval);
    }, []);

    // return (

    // );
};

export default Reminders;