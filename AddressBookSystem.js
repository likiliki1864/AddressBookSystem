class AddressBookSystem {

    contacts = [];

        addContact(firstName, lastName, address, city, state, zip, phoneNumber, email) {
            const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
            const addressCityStatePattern = /^.{4,}$/;
            const zipPattern = /^\d{5}$/;
            const phonePattern = /^\d{10}$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!namePattern.test(firstName))
                throw new Error("First Name must start with a capital letter and be at least 3 characters long.");
            if (!namePattern.test(lastName)) 
                throw new Error("Last Name must start with a capital letter and be at least 3 characters long.");
            if (!addressCityStatePattern.test(address)) 
                throw new Error("Address must be at least 4 characters long.");
            if (!addressCityStatePattern.test(city)) 
                throw new Error("City must be at least 4 characters long.");
            if (!addressCityStatePattern.test(state)) 
                throw new Error("State must be at least 4 characters long.");
            if (!zipPattern.test(zip)) 
                throw new Error("Zip code must be a valid 5-digit number.");
            if (!phonePattern.test(phoneNumber)) 
                throw new Error("Phone number must be a valid 10-digit number.");
            if (!emailPattern.test(email)) 
                throw new Error("Email must be valid.");

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
