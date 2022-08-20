const { RESTDataSource } = require('apollo-datasource-rest');

class ExerciseAPI extends RESTDataSource {
  constructor() {
    super();
    // the Catstronauts catalog is hosted on this server
    this.baseURL = 'https://exercisedb.p.rapidapi.com/';
  }
  willSendRequest(request) {
    // console.log('Dilip Context: ', this.context);
    request.headers.set('X-RapidAPI-Key', this.context.Key);
    request.headers.set('X-RapidAPI-Host', this.context.Host);
  }

  getBodyPartList() {
    return this.get('exercises/bodyPartList');
  }

  getBodyPart(bodyPart) {
    console.log(bodyPart);
    return this.get(`exercises/bodyPart/${bodyPart}`);
  }

  getExerciseId(id) {
    return this.get(`exercises/exercise/${id}`);
  }
  getExerciseName(name) {
    return this.get(`exercises/name/${name}`);
  }
  getTargetMuscles() {
    return this.get('exercises/targetList');
  }
  getTargetMuscle(target) {
    return this.get(`exercises/target/${target}`);
  }
  getAllExercises() {
    return this.get('exercises');
  }
  getEquipmentType(type) {
    return this.get(`exercises/equipment/${type}`);
  }
  getAllEquipments() {
    return this.get('exercises/equipmentList');
  }
}

module.exports = ExerciseAPI;
