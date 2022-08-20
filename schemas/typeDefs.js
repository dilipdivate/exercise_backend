const { gql } = require('apollo-server');

const typeDefs = gql`
  # Track API Data Source
  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    "The track's complete array of Modules"
    modules: [Module!]!
  }
  type Author {
    id: String!
    name: String!
    photo: String
  }

  type Module {
    id: String!
    "The module's title"
    title: String!
    "The module's length in minutes"
    length: Int
    "The module's text-based description, can be in markdown format. In case of a video, it will be the enriched transcript"
    content: String
    "The module's video url, for video-based modules"
    videoUrl: String
  }

  # Exercise API Data Source
  type BodyPart {
    bodyPart: String
    equipment: String
    gifUrl: String
    id: String
    name: String
    target: String
  }

  type Query {
    tracksForHome: [Track!]!
    author(authorId: String!): Author
    track(id: ID!): Track!
    trackmodules(id: String!): [Module]
    module(id: ID!): Module!
    bodyPartList: [String]
    bodyPart(bodyPart: String!): [BodyPart]
    exerciseId(id: String!): BodyPart
    exerciseName(name: String!): [BodyPart]
    targetMuscles: [String]
    targetMuscle(target: String!): [BodyPart]
    allExercises: [BodyPart]
    equipmentType(type: String!): [BodyPart]
    allEquipments: [String]
    user(username: String!): User!
    posts: [Post!]
    post(id: ID!): Post!
    books: [Book!]!
    writers: [Writer!]!
    # allMedia: [Media]
    # search(contains: String): [SearchResult!]
  }

  # MongoDB Database Data Source
  type User {
    username: String!
    userrole: String!
    email: String!
  }

  input UserInput {
    username: String!
    userrole: String!
    email: String!
  }

  type Movie {
    id: ID!
    title: String!
    year: Int!
    overview: String!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
  }

  type Course {
    courseName: String!
  }
  input PostType {
    body: String!
  }

  type IncrementTrackViewsResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }

  interface Book {
    title: String!
    writer: Writer!
  }

  type TextBook implements Book {
    title: String!
    writer: Writer!
    courses: [Course!]!
  }

  type ColoringBook implements Book {
    title: String!
    writer: Writer!
    colors: [String!]!
  }

  type Writer {
    name: String!
    books: [Book!]!
  }

  input CreateMovieInput {
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  input UpdateMovieInput {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!

    createUser(username: String!, userrole: String!, email: String!): User!

    updateUser(username: String!, userrole: String!, email: String!): User!

    deleteUser(username: String!): User

    createPost(post: PostType): Post
    deletePost(id: ID!): Post
    updatePost(id: ID!, body: String!): String

    addBook(createBook: CreateBook): Book!
    createMovie(createMovieInput: CreateMovieInput!): Movie
    deleteMovie(id: ID!): Movie
    updateMovie(input: UpdateMovieInput!): Movie!
  }

  input CreateBook {
    title: String!
    price: Int!
    writer: String!
  }

  input MediaDetails {
    format: MediaFormat!
    url: String!
  }

  enum MediaFormat {
    IMAGE
    VIDEO
  }
  # union Media = Book | Movie
  # union SearchResult = Book | Author
`;

module.exports = typeDefs;
