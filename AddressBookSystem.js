class AddressBookSystem{
    
    contacts = [];

        addContact(firstName, lastName, address, city, state, zip, phoneNumber, email) {
            let contact = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                state: state,
                zip: zip,
                phoneNumber: phoneNumber,
                email: email
            };            

            this.contacts.push(contact);
            
        }

}
