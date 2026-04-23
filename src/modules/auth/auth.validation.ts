export const validateRegisterInput = (payload: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  if (!payload.name || !payload.email || !payload.password) {
    throw new Error("Name, email, and password are required");
  }
};

export const validateLoginInput = (payload: {
  email?: string;
  password?: string;
}) => {
  if (!payload.email || !payload.password) {
    throw new Error("Email and password are required");
  }
};
