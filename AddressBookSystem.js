class AddressBookSystem {
    addressBooks = {};

    createAddressBook(bookName) {
        if (this.addressBooks[bookName])
            throw new Error("Address book already exists.");
        this.addressBooks[bookName] = [];
        console.log(`${bookName} Address book created.`);
    }

    addContact(bookName, firstName, lastName, address, city, state, zip, phoneNumber, email) {
        if (!this.addressBooks[bookName])
            throw new Error(`${bookName} Address book does not exist. Please create it first.`);

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

        this.addressBooks[bookName].push(contact);
    }

    editContact(bookName, firstName, lastName, updatedInfo) {
        if (!this.addressBooks[bookName])
            throw new Error(`${bookName} Address book does not exist. Please create it first.`);

        const contactIndex = this.addressBooks[bookName].findIndex(contact => 
            contact.firstName === firstName && contact.lastName === lastName
        );

        if (contactIndex === -1)
            throw new Error("Contact not found.");

        this.addressBooks[bookName][contactIndex] = { 
            ...this.addressBooks[bookName][contactIndex], 
            ...updatedInfo 
        };
        console.log("Contact updated:", this.addressBooks[bookName][contactIndex]);
    }

    getContact(bookName, firstName, lastName) {
        if (!this.addressBooks[bookName])
            throw new Error(`${bookName} Address book does not exist. Please create it first.`);

        const contact = this.addressBooks[bookName].find(contact => 
            contact.firstName === firstName && contact.lastName === lastName
        );

        if (!contact)
            throw new Error("Contact not found.");

        return contact;
    }
}
