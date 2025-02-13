import { makeAutoObservable } from "mobx";

export default class AdminStore {
  constructor() {
    this._faculties = [];
    this._depts = [];
    this._groups = [];
    makeAutoObservable(this);
  }

  setFaculties(faculty) {
    this._faculties = faculty;
  }
  addFaculty(faculty) {
    this._faculties.push(faculty);
  }
  get faculties() {
    return this._faculties;
  }

  setDepts(dept) {
    this._depts = dept;
  }
  addDept(dept) {
    this._depts.push(dept);
  }
  get depts() {
    return this._depts;
  }

  setGroups(group) {
    this._groups = group;
  }
  addGroup(group) {
    this._groups.push(group);
  }
  get groups() {
    return this._groups;
  }
}