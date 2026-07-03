export const validateTaskInput = (data) => {
  const errors = {};

  // Title validation
  if (!data.title) {
    errors.title = 'Title is required';
  } else if (data.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (data.title.length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }

  // Due date validation
  if (!data.dueDate) {
    errors.dueDate = 'Due date is required';
  } else {
    const dueDate = new Date(data.dueDate);
    if (isNaN(dueDate.getTime())) {
      errors.dueDate = 'Invalid due date format';
    }
  }

  // Description validation (optional but has max length)
  if (data.description && data.description.length > 1000) {
    errors.description = 'Description cannot exceed 1000 characters';
  }

  // Priority validation (optional)
  if (data.priority) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(data.priority)) {
      errors.priority = 'Priority must be: low, medium, or high';
    }
  }

  // Status validation (optional)
  if (data.status) {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(data.status)) {
      errors.status = 'Status must be: pending, in-progress, or completed';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegisterInput = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Name is required';
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please provide a valid email';
    }
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLoginInput = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please provide a valid email';
    }
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
