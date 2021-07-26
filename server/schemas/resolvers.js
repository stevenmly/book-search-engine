const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) 
            {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password');
                return userData;
            }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return {token, user};
          },
          saveBook: async (parent, input, context) => {
              if(context.user) {
                const user = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { savedBooks: input.input }},
                    { new: true }
                );
                return user;
              }
              throw new AuthenticationError("You need to be logged in to save books!");
          },
          removeBook: async (parent, args, context) => {
              if(context.user) {
                  const user = await User.findOneAndUpdate(
                      {_id: context.user._id},
                      {$pull: { savedBooks: { bookId: args.bookId } } },
                      { new: true, safe: true }
                  );
                  return user;
              }
              throw new AuthenticationError('You need to be logged in!');
          }
    }

}

module.exports = resolvers; 