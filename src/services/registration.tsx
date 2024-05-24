import axios from "axios";
import { baseUrl } from "./commonVariables";
import { TForPasswordChange } from "../pages/account/changePassword";
import { TToDeleteAccount } from "../pages/account/deleteAccount";

type TUser = {
  token?: string;
  id?: string;
  email?: string;
};

let user: TUser = {};
const setUser = () => {
  let token = "";
  let id = "";
  let email = "";
  const loggedUserJSON = window.localStorage.getItem("user");  
  if (loggedUserJSON) {
    const storedUser = JSON.parse(loggedUserJSON);
    token = `Bearer ${storedUser.access_token}`;
    id = storedUser.user.id;
    email = storedUser.user.email;
  }
  user = { token, id, email };
};

setUser();

const registerApplicant = async (createJob: object) => {
  const res = await axios.post(
    `${baseUrl}/api/v1/auth/register/job`,
    createJob
  );
  return res.data;
};
const registerEmployer = async (createEmp: object) => {
  const res = await axios.post(
    `${baseUrl}/api/v1/auth/register/emp`,
    createEmp
  );
  return res.data;
};
const authenticate = async (login: object) => {
  const res = await axios.post(`${baseUrl}/api/v1/auth/authenticate`, login);
  return res.data;
};

const emailSender = async (email: object) => {
  const res = await axios.post(
    `${baseUrl}/api/v1/auth/email_sender/send`,
    email
  );
  return res.data;
};
const checkCode = async (code: object) => {
  const res = await axios.post(
    `${baseUrl}/api/v1/auth/email_sender/check`,
    code
  );
  return res.data;
};
const changePassword = async (credentials: TForPasswordChange) => {
  const { email, oldPassword, newPassword } = credentials;
  const response = await axios.put(
    `${baseUrl}/admin/password/change?email=${email}&oldPassword=${oldPassword}&newPassword=${newPassword}`
  );
  return response.data;
};

const deleteAccount = async (credentials: TToDeleteAccount) => {
  const { email } = credentials;
  const response = await axios.delete(
    `${baseUrl}/admin/delete/account?email=${email}`
  );
  return response.data;
};

const registerService = {
  registerApplicant,
  registerEmployer,
  authenticate,
  emailSender,
  checkCode,
  setUser,
  user,
  changePassword,
  deleteAccount,
};
export default registerService;
