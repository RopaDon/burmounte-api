import { Authorized } from "routing-controllers";

export function Authorization(roles: string[] = [], permissions: string[] = []) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalAuthorized = Authorized; // Reference to the original Authorized decorator

    // Apply the original Authorized decorator first
    originalAuthorized(roles)(target, key, descriptor);

    // Add additional functionality
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // Perform additional authorization logic here
      const user = args[0]; // Assuming the user is the first argument

      // Check if the user has all the required permissions
      // const hasPermissions = permissions.every((permission) => user.permissions.includes(permission));

      // if (!hasPermissions) {
      //   throw new Error("Access denied");
      // }

      // Call the original method
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
