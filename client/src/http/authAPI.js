import { $authHost } from "./index";

export const fetchFeedback = async () => {
  const { data } = await $authHost.get("api/feedback");
  return data;
};

export const createFeedback = async ({title, message}) => {
  const { data } = await $authHost.post("api/feedback", {title, message});
  return data;
};

export const deleteFeedback = async (id) => {
  const { data } = await $authHost.delete(`api/feedback/${id}`);
  return data;
};

export const fetchGrades = async () => {
  const { data } = await $authHost.get("api/rating");
  return data;
};

export const submitGrade = async (id, gradeData) => {
  const response = await $authHost.put(`/api/rating${id}`, gradeData); 
  return response.data;
};

export const fetchTasks = async (date) => {
  try {
    const response = await $authHost.get(`/api/ipr/${date}`); 
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error; 
  }
};

export const createTask = async (task) => {
  try {
    const response = await $authHost.post("/api/ipr/", task);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error;
  }
};

export const updateTask = async (task) => {
  try {
    const response = await $authHost.put(`/api/ipr//${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await $authHost.delete(`/api/ipr//${id}`);
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw error;
  }
};

export const fetchAvgRate = async () => {
  const response = await $authHost.get(`api/main/avg`);
  console.log(response)
  return response.data.avg_rate;
};

export const fetchCountLessonsToday = async () => {
  const response = await $authHost.get(`api/main/les`);
  return response.data;
};
 
export const fetchLessonsToday = async () => {
  const response = await $authHost.get(`api/main/les`);
  return response.data;
};

export const fetchGoalsToday = async () => {
  const response = await $authHost.get(`api/main/ipr`);
  return response.data;
};

export const createMaterials = async (maretial) => {
  try {
    const response = await $authHost.post("/api/material", maretial);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error;
  }
};

export const fetchMaterials = async () => {
  const response = await $authHost.get("/api/material"); 
  return response.data.rows;
};

export const fetchMaterialsForStudent = async () => {
  const response = await $authHost.get("/api/material/s"); 
  return response.data;
};

export const fetchMaterialsForTeacher = async () => {
  const response = await $authHost.get("/api/material/t"); 
  return response.data;
};

export const fetchSubjects = async () => {
  const response = await $authHost.get("/api/material/subject"); 
  return response.data;
};

export const fetchAllVacancies = async () => {
  const response = await $authHost.get("/api/practic"); 
  return response.data.rows;
};

export const fetchMyVacancies = async () => {
  const response = await $authHost.get("/api/practic/my"); 
  return response.data;
};

export const applyForVacancy = async (id) => {
  const response = await $authHost.post(`/api/practic/${id}`); 
  return response.data.rows;
};

export const fetchUser = async () => {
  const response = await $authHost.get(`/api/profile`); 
  return response.data;
};

export const updateUser = async (email, phone, password) => {
  const response = await $authHost.put(`/api/profile`, {email, phone, password}); 
  return response.data;
};

export const addResumeUser = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await $authHost.put(`/api/profile/resume`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const getAll = async (page, searchText) => {
  const response = await $authHost.post('api/timetable', {  page, searchText });
  return response.data;
};

export const getAllByDate = async (page) => {
  const response = await $authHost.get('api/timetable/date', { page });
  return response.data;
};

export const getByQuery = async (searchValue, page = 1, pageSize = 7) => {
  const response = await $authHost.post('api/timetable/search', { searchValue, page, pageSize });
  return response.data;
};