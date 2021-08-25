import axios from "axios";

const baseURL = "http://localhost:8080/api";

const API_ENDPOINTS = {
  baseDir: "baseDir",
  dir: "dir",
};

export class ApiService {
  static async getBaseDir() {
    try {
      const {
        data: { baseDir },
      } = await axios.get(API_ENDPOINTS.baseDir, { baseURL });
      return baseDir;
    } catch (error) {
      console.log("Error fetching baseDir");
    }
  }

  static async getPathContents(path) {
    try {
      const encodedPath = encodeURIComponent(path);
      const { data } = await axios.get(`${API_ENDPOINTS.dir}/${encodedPath}`, {
        baseURL,
      });
      return data;
    } catch (error) {
      console.log("Error fetching baseDir");
    }
  }
}
