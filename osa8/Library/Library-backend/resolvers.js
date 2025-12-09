const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const jwt = require('jsonwebtoken')
const Author = require('./schemas/author')
const Book = require('./schemas/book')
const User = require('./schemas/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          filter.author = author._id
        } else {
          return []
        }
      }

      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }

      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id })
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      try {
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id
        })

        const savedBook = await book.save()
        const populatedBook = await savedBook.populate('author')


        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

        return populatedBook

      } catch (error) {
        throw new GraphQLError('Adding book failed: ' + error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          }
        })
      }
    },


    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
            extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) return null

        author.born = args.setBornTo
        await author.save()

        return author
      } catch (error) {
        throw new GraphQLError('Editing author failed: ' + error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args
          }
        })
      }
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers