const { MongoDataSource } = require('apollo-datasource-mongodb');

class User extends MongoDataSource {
  // constructor(userId, username, userrole, email) {
  //   super();
  //   this.userId = userId;
  //   this.username = username;
  //   this.userrole = userrole;
  //   this.email = email;
  // }

  // async getUser(username) {
  //   return await this.findByFields({ username });
  //   // const data = await this.findByFields({ username });
  //   // // console.log('GetUsers', data);
  //   // return data;
  // }

  getUser(userId) {
    return this.findOneById(userId);
    // const data = await this.findByFields({ username });
    // // console.log('GetUsers', data);
    // return data;
  }

  async getPrivateUserData(userId) {
    console.log(userId);
    console.log(this.context);
    const isAuthorized = this.context.user === userId;
    if (isAuthorized) {
      const user = await this.findOneById(userId);
      return user && user.privateData;
    }
  }
}

module.exports = User;
