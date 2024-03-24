const Book = require("../models/Book");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    Query: {
        async book(_, { ID }) {
            return await Book.findById(ID)
        },
        async getBooks() {
            return await Book.find()
        },
        async user(_, { ID }) {
            return await User.findById(ID)
        },
        async getUsers() {
            return await User.find()
        }
    },
    Mutation: {
        async createBook(_, { BookInput: { name, description ,author,owner} }) {
            const createdBook = new Book({
                name,
                description,
                author,
                owner,
                createdAt: new Date().toISOString(),
            })

            const res = await createdBook.save()

            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteBook(_, { ID }) {
            const wasDeleted = (await Book.deleteOne({ _id: ID })).deletedCount;
            return wasDeleted;
        },
        async editBook(_, { ID, BookInput: { name, description } }) {
            const wasEdited = (await Book.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
            return wasEdited;
        },
        async register(_, { UserInput: { name, email, password, role } }) {
            try {
                const hashedPassword = await bcrypt.hash(password, 7);
                const user = new User({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    role: role,
                    isLogin: 0
                });

                const res = await user.save();

                return {
                    id: res.id,
                    ...res._doc
                };
            } catch (error) {
                console.error('Error registering user:', error);
                throw new Error('Failed to register user');
            }
        },
        async login(_, { email, password }) {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user.id }, 'bookstore', { expiresIn: '1h' });

            user.isLogin = 1;
            let res = await user.save();

            return {
                id: res.id,
                token: token,
                ...res._doc
            };
        },
        async logout(_, { ID }) {
            const user = await User.findOne({ _id: ID });
            if (!user) {
                throw new Error('User not found');
            }

            user.isLogin = 0;
            await user.save();

            return true;

        },
        async editUser(_, { ID, UserInput: { name, email, role } }) {
            const wasEdited = (await User.updateOne({ _id: ID }, { name: name, email: email, role: role })).modifiedCount;
            return wasEdited;
        },
        async deleteUser(_,{ID}){
            const wasDeleted = (await User.deleteOne({ _id: ID })).deletedCount;
            return wasDeleted;
        }
    }
}