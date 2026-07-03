import Task from '../models/Task.js';

export const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!title || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and due date'
      });
    }

    // Validate priority and status if provided
    const validPriorities = ['low', 'medium', 'high'];
    const validStatuses = ['pending', 'in-progress', 'completed'];

    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority. Must be: low, medium, or high'
      });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: pending, in-progress, or completed'
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: priority || 'medium',
      status: status || 'pending',
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('❌ Create Task Error:', error.message);
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { status, priority, search } = req.query;

    // Build filter object
    const filter = { userId };

    if (status) {
      const validStatuses = ['pending', 'in-progress', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status filter'
        });
      }
      filter.status = status;
    }

    if (priority) {
      const validPriorities = ['low', 'medium', 'high'];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid priority filter'
        });
      }
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch tasks sorted by creation date (newest first)
    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error('❌ Get All Tasks Error:', error.message);
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find task and verify ownership
    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    console.error('❌ Get Task by ID Error:', error.message);
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, description, dueDate, priority, status } = req.body;

    // Validation
    const validPriorities = ['low', 'medium', 'high'];
    const validStatuses = ['pending', 'in-progress', 'completed'];

    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority. Must be: low, medium, or high'
      });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: pending, in-progress, or completed'
      });
    }

    // Build update object (only include provided fields)
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;

    // Find and update task (verify ownership)
    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('❌ Update Task Error:', error.message);
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find and delete task (verify ownership)
    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete Task Error:', error.message);
    next(error);
  }
};
