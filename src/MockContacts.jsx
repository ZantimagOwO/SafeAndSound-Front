class Contact {
    constructor(id, name, phones){
        this.id = id
        this.name = name
        this.phones = phones
    }
}

let contacts = []

contacts.push(new Contact('1', 'Alejandra Julian', ['699121787']))
contacts.push(new Contact('2', 'Santiago Gimeno Julian', ['666970082']))
contacts.push(new Contact("3", "Cruz Julian", ['655303441']));

let temp = {}

contacts.forEach(c => {
    c.phones.forEach(p => {
        temp[p] = c.name
    })
})

export const phonesToNames = temp

export default contacts