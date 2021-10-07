import React from "react";

const AditionalInfo = (props) => {
    console.log(props.selectedUser);
    return (
        <div>
            <h3>Profile info:</h3>
            <div>
                First name: {props.selectedUser.firstName}
            </div>
            <div>
                Last name: {props.selectedUser.lastName}
            </div>
            <div>
                Adress: {props.selectedUser.adress.streetAddress}
            </div>
            <div>
                City: {props.selectedUser.adress.city}
            </div>
            <div>
                Index: {props.selectedUser.adress.zip}
            </div>
        </div>
    );
}

export default AditionalInfo;