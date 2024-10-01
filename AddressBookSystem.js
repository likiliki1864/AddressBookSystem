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
        
            const duplicateContact = this.addressBooks[bookName].filter(contact => 
                contact.firstName === firstName && contact.lastName === lastName
            );
        
            if (duplicateContact.length > 0)
                throw new Error(`Duplicate contact found: ${firstName} ${lastName} already exists in ${bookName} address book.`);
        
            if (!(/^[A-Z][a-zA-Z'-]{2,}$/).test(firstName))
                throw new Error("First Name must start with a capital letter and be at least 3 characters long.");
            if (!(/^[A-Z][a-zA-Z'-]{2,}$/).test(lastName))
                throw new Error("Last Name must start with a capital letter and be at least 3 characters long.");
            if (!(/^.{4,}$/).test(address))
                throw new Error("Address must be at least 4 characters long.");
            if (!(/^.{4,}$/).test(city))
                throw new Error("City must be at least 4 characters long.");
            if (!(/^.{4,}$/).test(state))
                throw new Error("State must be at least 4 characters long.");
            if (!(/^\d{5}$/).test(zip))
                throw new Error("Zip code must be a valid 5-digit number.");
            if (!(/^\d{10}$/).test(phoneNumber))
                throw new Error("Phone number must be a valid 10-digit number.");
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email))
                throw new Error("Email must be valid.");
        
            let contact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        
            this.addressBooks[bookName].push(contact);
            console.log(`Contact ${firstName} ${lastName} added to ${bookName} address book.`);
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

        deleteContact(bookName, firstName, lastName) {
            if (!this.addressBooks[bookName])
                throw new Error(`${bookName} Address book does not exist. Please create it first.`);

            const contactIndex = this.addressBooks[bookName].findIndex(
                contact => contact.firstName === firstName && contact.lastName === lastName
            );

            if (contactIndex === -1)
                throw new Error("Contact not found.");

            this.addressBooks[bookName].splice(contactIndex, 1);
            console.log(`Contact ${firstName} ${lastName} deleted from ${bookName} address book.`);
        }

        countContacts(bookName) {
            if (!this.addressBooks[bookName])
                throw new Error(`${bookName} Address book does not exist. Please create it first.`);

            const contactCount = this.addressBooks[bookName].reduce((count, contact) => count + 1, 0);
            console.log(`Number of contacts in ${bookName}: ${contactCount}`);
            return contactCount;
        }

        searchByCityState(bookName, city = null, state = null) {
            if (!this.addressBooks[bookName])
                throw new Error(`${bookName} Address book does not exist. Please create it first.`);

            let results = this.addressBooks[bookName];

            if (city)
                results = results.filter(contact => contact.city === city);

            if (state)
                results = results.filter(contact => contact.state === state);

            if (results.length === 0) {
                console.log(`No contacts found in ${city ? city : ""} ${state ? state : ""}.`);
                return [];
            }

            console.log(`Contacts found in ${city ? city : ""} ${state ? state : ""}:`, results);
            return results;
        }

        viewByCityState(bookName, city = null, state = null) {
            if (!this.addressBooks[bookName])
                throw new Error(`${bookName} Address book does not exist. Please create it first.`);
        
            let results = this.addressBooks[bookName];
        
            if (city)
                results = results.filter(contact => contact.city === city);
        
            if (state)
                results = results.filter(contact => contact.state === state);
            
            if (results.length === 0)
                console.log("No contacts found.");
            else {
                console.log(`Contacts in ${city || state}:`);
                results.forEach(contact => {
                    console.log(contact.toString());
                    console.log('****************');
                });
            }
        
            return results;
        }

        countByCityOrState(bookName, city = null, state = null) {
            if (!this.addressBooks[bookName])
                throw new Error(`${bookName} Address book does not exist. Please create it first.`);
        
            let results = this.addressBooks[bookName];
        
            if (city)
                results = results.filter(contact => contact.city === city);
        
            if (state)
                results = results.filter(contact => contact.state === state);
        
            let countByCity = 0;
            let countByState = 0;
        
            if (city)
                countByCity = results.filter(contact => contact.city === city).length;
        
            if (state)
                countByState = results.filter(contact => contact.state === state).length;
        
            if (city)
                console.log(`Number of contacts in ${city}: ${countByCity}`);
            if (state)
                console.log(`Number of contacts in ${state}: ${countByState}`);
        
            return {
                countByCity,
                countByState
            };
        }

        sortContactsByName(bookName) {
            if (!this.addressBooks[bookName])
                throw new Error(`${bookName} Address book does not exist. Please create it first.`);

            this.addressBooks[bookName].sort((a, b) => {
                const fullNameA = `${a.firstName} ${a.lastName}`;
                const fullNameB = `${b.firstName} ${b.lastName}`;
                return fullNameA.localeCompare(fullNameB);
            });

            console.log(`Contacts in ${bookName} sorted by name:`);
            this.addressBooks[bookName].forEach(contact => console.log(contact.toString()));
        }
}

class Contact {

        constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.phoneNumber = phoneNumber;
            this.email = email;
        }

        toString() {
            return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, ${this.city}, ${this.state}, ${this.zip}, Phone: ${this.phoneNumber}, Email: ${this.email}`;
        }
        
}