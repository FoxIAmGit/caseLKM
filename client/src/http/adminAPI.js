import { $authHost } from "./index";

export const createFaculty = async (cipher, full_name) => {
  const { data } = await $authHost.post("api/admin/faculty", {cipher,full_name,});
  return data;
};

export const fetchFaculty = async () => {
  const { data } = await $authHost.get("api/admin/faculty");
  return data;
};

export const putDecan = async (id, full_name) => {
  console.log(id, full_name);
  const { data } = await $authHost.put(`api/admin/faculty/${id}`, {
    full_name,
  });
  console.log(data);
  return data;
};

export const createDept = async (cipher, name) => {
  const { data } = await $authHost.post("api/admin/dept", { cipher, name });
  return data;
};

export const fetchDept = async () => {
  const { data } = await $authHost.get("api/admin/dept");
  return data;
};

export const putChief = async (id, full_name) => {
  console.log(id, full_name);
  const { data } = await $authHost.put(`api/admin/dept/${id}`, { full_name });
  console.log(data);
  return data;
};

export const createGroup = async (
  cipher,
  name,
  start_year,
  total_sem,
  faculty_cipher,
) => {
  const { data } = await $authHost.post("api/admin/group", {
    cipher,
    name,
    start_year,
    total_sem,
    faculty_cipher,
  });
  return data;
};

export const fetchGroup = async () => {
  const { data } = await $authHost.get("api/admin/group");
  return data;
};

export const createJob = async (title, descript, company_name) => {
  const { data } = await $authHost.post("api/admin/job", {
    title,
    descript,
    company_name,
  });
  return data;
};

export const createVacancies = async (
  start_date,
  end_date,
  title,
  name,
  cipher,
) => {
  const { data } = await $authHost.post("api/admin/vacancy", {
    start_date,
    end_date,
    title,
    name,
    cipher,
  });
  return data;
};

export const createSubject = async (
  name,
  type_exam,
  date_exam,
  semester,
  hours,
  full_name,
  cipher,
) => {
  const { data } = await $authHost.post("api/admin/subject", {
    name,
    type_exam,
    date_exam,
    semester,
    hours,
    full_name,
    cipher,
  });
  return data;
};

export const createSchedule = async (num_les, cabinet, date, name, cipher) => {
  const { data } = await $authHost.post("api/admin/lesson", {
    num_les,
    cabinet,
    date,
    name,
    cipher,
  });
  return data;
};

export const createUser = async (email, phone, password, role, full_name, belonging ) => {
  const { data } = await $authHost.post("api/user/registration", {
    email, phone, password, role, full_name, belonging 
  });
  return data;
};
