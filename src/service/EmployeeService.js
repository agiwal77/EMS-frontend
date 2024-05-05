import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const listEmployees = () => axios.get(REST_API_BASE_URL + '/getAll');
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL + '/create', employee);
export const getEmployee = (id) => axios.get(REST_API_BASE_URL + '/get/' + id);
export const updateEmployee = (id, employee) => axios.put(REST_API_BASE_URL + '/update/' + id, employee);
export const deleteEmployee = (id) => axios.delete(REST_API_BASE_URL + '/delete/' + id);