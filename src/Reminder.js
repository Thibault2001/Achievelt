import {useEffect} from 'react';
import { auth, db, ref, get } from './firebase';
import { toast } from 'react-toastify';
import {update} from 'firebase/database';

const Reminders = ({ onCheckReminders }) =>
{
    useEffect(() =>
    {
        const reminderInterval = setInterval(onCheckReminders, 60000);
        return () => clearInterval(reminderInterval);
    }, [onCheckReminders]);

        const checkReminders = async () => {
            console.log("Checking reminder");
            const user = auth.currentUser;
            if(user)
            {
                const userID = user.uid;
                const eventRef = ref(db, `calendar/${userID}/events`);

                try
                {
                    const snapshot = await get(eventRef);
                    const events = snapshot.val();
                    if(events)
                    {
                        const currentTime = new Date();

                        Object.keys(events).forEach(async (eventID) => 
                            {
                                const eventData = events[eventID];
                                const {eventDate, eventTime, reminderTime, eventTitle, eventDescription, notificationSent } = eventData;

                                if(!notificationSent)
                                {
                                    const eventDateTime = new Date(`${eventDate} ${eventTime}`);
                                    const reminderDateTime = new Date(eventDateTime.getTime() - reminderTime * 60000);
    
                                    if(currentTime >= reminderDateTime) //Change to == when happy with outcome
                                    {
                                        toast.info(`Reminder: ${eventTitle} on ${eventDate} at ${eventTime}`, { autoClose: 30000});
                                        
                                        const eventRefToUpdate = ref(db, `calendar/${userID}/events/${eventID}`);
                                        await update(eventRefToUpdate, {notificationSent: true});
                                    }
                                }  
                            });
                    }
                } catch (error)
                {
                    console.error("Error getting events: ", error);
                }
                
                };
            
        };

        return null;
};

export default Reminders;