import React, { useState } from 'react'
import './CSS files/Appointment.css';
import Modal from 'react-modal';
import EventDisplay from './EventDisplay' //Importing EventDisplay file
    
    function Appointment() 
    { //Defining state variables using the useState hook
        const[isModalOpen, setIsModalOpen] = useState(false);
        const[selectedItem, setSelectedItem] = useState(null);
        const[isDropdownOpen, setIsDropdownOpen] = useState(false);

        //Function to handle the itemClick from the dropdown menu for where user chooses which event type to choose.
        const handleItemClick = (item) =>
        {
            setSelectedItem(item);
            
            handleAppointmentClick();
            
        };

        //Handles the Add Event click. It will turn the modal display on which prompts the user to enter their event details.
        const handleAppointmentClick = () =>
        {
                setIsModalOpen(true);
        };

        //When the close button is clicked it will close the modal.
        const closeModal = () =>
        {
            setIsModalOpen(false);
        };

        //Toggles the dropdown 
        const toggleDropdown = () =>
        {
            setIsDropdownOpen(!isDropdownOpen);
        };
     
        //Array of all the items for the dropdown menu
        const items = [
            {id: 1, name: 'Appointment'},
            {id: 2, name: 'Sports'},
            {id: 3, name: 'Birthday'},
            {id: 4, name: 'University'}
        ]

    return (
      <div className="appointment">
           <button onClick={toggleDropdown} className="appointment-toggle"> {/*Button to toggle the dropdown menu */}
            Add Event
           </button>   
           
            {/* Dropdown menu */}  
            {isDropdownOpen && (
            <ul className="appointment-menu">
                {items.map((item) => (
                    <li
                    key={item.id}
                    className={selectedItem === item ? 'selected' : ''}
                    onClick={() => handleItemClick(item)}
                    >
                       {item.name} 
                    </li>
                    
                ))}
            </ul>
            )}
            {/* Modal for displaying the selected event type, e.g. Sports */}
            <div className="modal-custom"> 
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Popup Modal"
                >
                    <EventDisplay selectedItem={selectedItem} closeModal={closeModal}/> {/*Calls the EventDisplay*/}
                    <button class="closeButton" onClick={closeModal}> Close </button>
                </Modal>
           </div>
      </div>

    );
}

export default Appointment