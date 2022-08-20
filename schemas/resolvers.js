const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },

    // get a author by ID, for the track page
    author: (_, { authorId }, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },

    // get a single module by ID, for the module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },

    trackmodules: (_, { id }, { dataSources }) => {
      console.log(id);
      return dataSources.trackAPI.getTrackModules(id);
    },

    // user: async (_, { username }) => await UserModel.findOne({ username }),

    user: async (_, args, { dataSources, models }) => {
      console.log('Dilip args:', args);
      // return dataSources.usersDb.getUser(args.username);
      try {
        const user = await models.User.find({
          username: args.username,
        });
        console.log(user);
        return user;
        // return await models.User.find({ username: args.username });
      } catch (error) {
        console.log('Dilip Error:', error);
        throw error;
      }
    },
    bodyPartList: (_, __, { dataSources }) => {
      // console.log(role);
      // if (role === 'Host') {
      return dataSources.exerciseAPI.getBodyPartList();
      // }
    },

    bodyPart: (_, args, { dataSources }) => {
      // const userD = dataSources.usersDb.getPrivateUserData(user);
      // console.log(userD);
      return dataSources.exerciseAPI.getBodyPart(args.bodyPart);
    },
    exerciseId: (_, args, { dataSources }) => {
      return dataSources.exerciseAPI.getExerciseId(args.id);
    },
    exerciseName: (_, args, { dataSources }) => {
      return dataSources.exerciseAPI.getExerciseName(args.name);
    },
    targetMuscles: (_, __, { dataSources }) => {
      return dataSources.exerciseAPI.getTargetMuscles();
    },
    targetMuscle: (_, args, { dataSources }) => {
      return dataSources.exerciseAPI.getTargetMuscle(args.target);
    },
    allExercises: (_, __, { dataSources }) => {
      return dataSources.exerciseAPI.getAllExercises();
    },
    equipmentType: (_, args, { dataSources }) => {
      return dataSources.exerciseAPI.getEquipmentType(args.type);
    },
    allEquipments: (_, __, { dataSources }) => {
      return dataSources.exerciseAPI.getAllEquipments();
    },
    posts: async (_, __, { models }) => {
      try {
        const postsFetched = await models.Post.find();
        return postsFetched.map((post) => {
          return {
            ...post._doc,
            id: post.id,
            createdAt: new Date(post._doc.createdAt).toISOString(),
          };
        });
      } catch (error) {
        throw error;
      }
    },
    post: async (_, args, { models }) => {
      try {
        const postFetched = await models.Post.findById(args.id);
        return {
          ...postFetched._doc,
          id: postFetched.id,
          createdAt: new Date(postFetched._doc.createdAt).toISOString(),
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },

    modules: ({ id }, _, { dataSources }) => {
      console.log('Dilip1:', id);
      return dataSources.trackAPI.getTrackModules(id);
    },
  },
  Book: {
    __resolveType(book, context, info) {
      if (book.courses) {
        return 'TextBook';
      }
      if (book.colors) {
        return 'ColoringBook';
      }
      return null;
    },
  },
  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
    createUser: async (_, args, { models }) => {
      // const user = {
      //   username: args.username,
      //   userrole: args.userrole,
      //   email: args.email,
      // };
      return await models.User.create({
        username: args.username,
        userrole: args.userrole,
        email: args.email,
      });
      // return await models.User.create(user);
    },

    updateUser: async (_, args, { models }) => {
      // console.log(args);
      // console.log(dataSources);

      return await models.User.findOneAndUpdate(
        { username: args.username },
        {
          $set: {
            username: args.username,
            email: args.email,
            userrole: args.userrole,
          },
        },
        { new: true }
      );
    },
    deleteUser: async (_, args, { models }) => {
      return await models.User.findOneAndRemove({ username: args.username });
    },
    createPost: async (_, args, { models }) => {
      try {
        const { body } = args.post;
        const post = new models.Post({ body });
        const newPost = await post.save();
        return { ...newPost._doc, id: newPost.id };
      } catch (error) {
        throw error;
      }
    },
    deletePost: async (_, args, { models }) => {
      try {
        const deletedPost = await models.Post.findByIdAndDelete(args.id);
        return {
          ...deletedPost._doc,
          id: deletedPost.id,
          createdAt: new Date(deletedPost._doc.createdAt).toISOString(),
        };
      } catch (error) {
        throw error;
      }
    },
    updatePost: async (_, args, { models }) => {
      try {
        const { id, body } = args;
        const updatedPost = await models.Post.findByIdAndUpdate(id, {
          body: body,
        });
        return `Post ${updatedPost.id} updated Successfully`;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
