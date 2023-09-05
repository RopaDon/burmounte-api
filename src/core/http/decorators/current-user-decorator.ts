import { createParamDecorator } from "routing-controllers";

export function CurrentUser(): ParameterDecorator {
  return createParamDecorator({
    value: (action) => {
      // Retrieve the current user ID from the request object
      const user = action.request.user; // Assuming the user ID is stored in the `id` field of the user object in the request

      // Return the current user ID
      return user;
    },
  }) as any;
}
