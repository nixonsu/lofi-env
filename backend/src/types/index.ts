import { Request } from "express";

export interface UserAuthInfoRequest extends Request {
  // Come back to this
  user?: any;
}
