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

  //////////////////// AUTH ROUTES ////////////////////
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

  /**Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //////////////////// USER ROUTES ////////////////////
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

  //////////////////// COURSE ROUTES ////////////////////
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

  //////////////////// TOURNAMENT ROUTES ////////////////////
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

  /** Update a tournament by date */
  static async updateTournament(date, data) {
    let res = await this.request(`tournaments/${date}`, data, "patch");
    return res.tournament;
  }

  /** Delete a tournament by date */
  static async deleteTournament(date, data) {
    let res = await this.request(`tournaments/${date}`, data, "delete");
    return res.deleted;
  }

  //////////////////// ROUND ROUTES ////////////////////
  /** Get a round by id*/
  static async getRound(id) {
    let res = await this.request(`rounds/${id}`);
    return res.round;
  }

  /** Create a new round */
  static async createRound(data) {
    let res = await this.request("rounds", data, "post");
    return res.round;
  }

  /** Edit a round by id */
  static async updateRound(id, data) {
    let res = await this.request(`rounds/${id}`, data, "patch");
    return res.round;
  }

  /** Delete a round by id */
  static async deleteRound(id, data) {
    let res = await this.request(`rounds/${id}`, data, "delete");
    return res.deleted;
  }

  //////////////////// GREENIE ROUTES ////////////////////
  /** Get all greenies (optionally filter by tournament_date) */
  static async getGreenies(date) {
    let res = await this.request("greenies", { date: date });
    return res.greenies;
  }
}

export default CcgcApi;
