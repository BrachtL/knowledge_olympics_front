export const submitStudentData = async (data) => {
  // Mock function to simulate submitting student data
  // In a real application, replace this with an actual API call
  console.log("Submitting student data:", data);
  // Simulate a response from the server (e.g., success or error)
  return { success: true, message: "Student data submitted successfully", student_name: "Aluno Teste" };
};

export const submitTeacherData = async (data) => {
  // Mock function to simulate submitting teacher data
  // In a real application, replace this with an actual API call
  console.log("Submitting teacher data:", data);
  // Simulate a response from the server (e.g., success or error)
  return { success: true, message: "Teacher data submitted successfully" };
};

export const saveQuestionsData = async (data) => {
  // Mock function to simulate saving questions data
  // In a real application, replace this with an actual API call
  console.log("Saving questions data:", data);
  // Simulate a response from the server (e.g., success or error)
  return { success: true, message: "Questions data saved successfully" };
};