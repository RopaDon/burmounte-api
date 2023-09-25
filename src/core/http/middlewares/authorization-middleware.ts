import { verify } from "jsonwebtoken";
import { Action } from "routing-controllers";
import { HttpStatusCodes } from "../status-codes";
import { ExceptionTypes } from "../../exceptions/types";
import ServiceHubException from "../../exceptions/service-hub-exception";

export default class AuthorizationMiddleware {
  public static async authorize(action: Action, roles: string[]) {
    try {
      const token = action.request.headers.authorization?.split(" ")[1];

      const { user } = verify(token!, process.env.ACCESS_TOKEN_KEY!) as { user: any };

      if (!user) return false;

      if (roles.length > 0 && !roles.includes(user.role.name)) {
        return false;
      }

      action.request.user = user;

      return true;
    } catch (error) {
      console.log(error);
      throw new ServiceHubException(HttpStatusCodes.UNAUTHORIZED, "An error occured authorizing the user to access this resource");
    }
  }

  public static currentUserChecker(action: Action): any | undefined {
    // Retrieve the current user from the request or any other source
    // const currentUser: AdminDTO | undefined = action.request.user;
    // return currentUser;
  }
}
