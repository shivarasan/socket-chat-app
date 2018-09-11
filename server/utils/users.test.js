const { User } = require('./users');
const expect = require('expect');

describe('User', () => {
    let users;
    beforeEach(() => {
        users = new User();
        users.users = [{
            id: '1',
            name: 'shiva',
            room: 'node'
        }, {
            id: '2',
            name: 'kamal',
            room: 'react'
        },{
            id: '3',
            name: 'vijay',
            room: 'node'
        }]
    })
    it('user object should be', () => {
        const users = new User();
        const user = {
            id: 'sdfsdf',
            name: 'shiva',
            room: 'Room b'
        }
        const res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);

    });

    it('it should return names for react', () => {
        const userList = users.getUserList('react');
        expect(userList).toEqual(['kamal']);
    });

    it('it should find user', () => {
        const userId = '1';
        const user = users.getUser(userId);
        expect(userId).toBe(user.id);
    });

    it('it should remove user', () => {
        const userId = '2';
        const user = users.removeUser(userId);
        expect(userId).toBe(user.id);
        expect(users.users.length).toBe(2);
    })
})