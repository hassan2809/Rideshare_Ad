import http from "./httpService";
import { getAuthHeader } from "./userService";

const apiEndpoint = "/drivers";

// =====|  Drivers Service  |=====

const DriverService = {
  getAllDrivers: () =>
    http.get(`${apiEndpoint}`, { headers: getAuthHeader() }),
  getDriverById: (id: string) =>
    http.get(`${apiEndpoint}/driver/${id}`, { headers: getAuthHeader() }),
  addDriver: (data: any) =>
    http.post(`${apiEndpoint}/add-driver`, data, {
      headers: { "Content-Type": "multipart/form-data", ...getAuthHeader() },
    }),
  editDriver: (id: string, formData: any) =>
    http.patch(`${apiEndpoint}/edit-driver/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data", ...getAuthHeader() },
    }),
  deleteDriver: (id: string) =>
    http.delete(`${apiEndpoint}/delete-driver/${id}`, {
      headers: getAuthHeader(),
    }),
};

// =====|  APIs  |=====

export const getAllDrivers = () => DriverService.getAllDrivers();

export const getDriverById = (id: string) =>
  DriverService.getDriverById(id);

export const addDriver = (data: any) =>
  DriverService.addDriver(data);

export const editDriver = (id: string, formData: any) =>
  DriverService.editDriver(id, formData);

export const deleteDriver = (id: string) =>
  DriverService.deleteDriver(id);
