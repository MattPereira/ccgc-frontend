import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class CcgcApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CcgcApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  /**Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**Get all club members. */
  static async getMembers() {
    let res = await this.request(`users`);
    return res.users;
  }

  /**Get details (all rounds played) by a particular club member. */
  static async getMember(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update a user profile  */
  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Get courses */
  static async getCourses() {
    let res = await this.request("courses");
    return res.courses;
  }

  /** Get a course by handle */
  static async getCourse(handle) {
    let res = await this.request(`courses/${handle}`);
    return res.course;
  }

  /** Create a new course */
  static async createCourse(data) {
    let res = await this.request("courses", data, "post");
    return res.course;
  }

  /** Update a course */
  static async updateCourse(handle, data) {
    let res = await this.request(`courses/${handle}`, data, "patch");
    return res.course;
  }

  /** Delete a course */
  static async deleteCourse(handle, data) {
    let res = await this.request(`courses/${handle}`, data, "delete");
    return res.deleted;
  }

  /** Get tournaments */
  static async getTournaments() {
    let res = await this.request("tournaments");
    return res.tournaments;
  }

  /** Get a tournament by date. */
  static async getTournament(date) {
    let res = await this.request(`tournaments/${date}`);
    return res.tournament;
  }

  /** Create a new tournament */
  static async createTournament(data) {
    let res = await this.request("tournaments", data, "post");
    return res.tournament;
  }

  /** Delete a tournament by date */
  static async deleteTournament(date, data) {
    let res = await this.request(`tournaments/${date}`, data, "delete");
    return res.tournament;
  }

  /** Register for site.  */
  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** login to site.  */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }
}

// for now, put token ("testuser" / "password" on class)
// CcgcApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default CcgcApi;
