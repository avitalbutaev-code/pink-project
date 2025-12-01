const postsRepo = require("../repositories/post-repo");

async function getAllPosts(userId = undefined) {
  return await postsRepo.getPosts((userId = undefined));
}

async function createPost(userId, title, content) {
  if (userId === undefined || title === undefined || content === undefined) {
    throw new Error("userId,title and content have to be defined");
  }
  if (typeof userId !== "number" && isNaN(parseInt(userId))) {
    throw new Error("userId must be a number");
  }
  return await postsRepo.addPost(userId, title, content);
}

async function editPost(userId, postId, newContent) {
  if (
    userId === undefined ||
    postId === undefined ||
    title === undefined ||
    content === undefined
  ) {
    throw new Error("userId,title and content have to be defined");
  }
  if (typeof userId !== "number" && isNaN(parseInt(userId))) {
    throw new Error("userId must be a number");
  }
  if (typeof postId !== "number" && isNaN(parseInt(postId))) {
    throw new Error("postId must be a number");
  }
  return await postsRepo.updatePost(userId, postId, newContent);
}

async function removePost(userId, postId) {
  return await postsRepo.deletePost(userId, postId);
}

module.exports = { getAllPosts, createPost, editPost, removePost };

// async createClassroom(grade, index, teacherId) {
//     // Validation
//     if (grade === undefined || index === undefined) {
//       throw new Error('Grade and index are required');
//     }

//     if (typeof grade !== 'number' && isNaN(parseInt(grade))) {
//       throw new Error('Grade must be a number');
//     }

//     if (typeof index !== 'number' && isNaN(parseInt(index))) {
//       throw new Error('Index must be a number');
//     }

//     // Validate teacher exists if provided
//     if (teacherId !== undefined && teacherId !== null) {
//       const teacher = await teacherRepository.findById(teacherId);
//       if (!teacher) {
//         throw new Error('Teacher not found');
//       }
//     }

//     // Create classroom
//     const classroomId = await classroomRepository.create(
//       parseInt(grade),
//       parseInt(index),
//       teacherId || null
//     );
//     return {
//       id: classroomId,
//       grade: parseInt(grade),
//       index: parseInt(index),
//       teacher_id: teacherId || null
//     };
//   }
