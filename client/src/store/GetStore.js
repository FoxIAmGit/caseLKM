import { makeAutoObservable } from "mobx";

export default class GetStore {
  constructor() {
    this._feedbacks = [];
    this._grades = [];
    this._tasks = [];
    makeAutoObservable(this);
  }

  setFeedbacks(feedback) {
    this._feedbacks = feedback;
  }
  get feedbacks() {
    return this._feedbacks;
  }

  setGrades(grade) {
    this._grades = grade;
  }
  get grades() {
    return this._grades;
  }

  setTasks(task) {
    this._tasks = task;
  }
  get tasks() {
    return this._tasks;
  }
}