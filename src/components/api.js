const BASE_URL = 'https://knowledge-olympics-back.glitch.me'; //todo: change this url
import { setCookie, getCookie, deleteCookie } from '../cookieHandler';

export async function matchCookie(userIdAndType, token) {
  const url = `${BASE_URL}/matchCookie`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(userIdAndType)
      //teacher: name, password, type
      //student: name, birthdate, numberId, classroom, school, type
      //todo: I need id property on teacher and student
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      if (response.status === 401) {
        console.log("checkpoint 00012");
        console.log("inside match fail");
        //deleteCookie("jwt_token");
        if(userIdAndType.type == "student") {
          deleteCookie("jwt_token");
          window.location.href = '/';
        } else {
          sessionStorage.removeItem('jwt_token');
          window.location.href = '/teacher';
        }
        
      } else {
        console.log(errorData);
        throw new Error('Authentication failed');
      }
    } 
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong. Please try again.');
  }
}

export async function login(userData) {
  const url = `${BASE_URL}/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), 
      //teacher: name, password, type
      //student: name, birthdate, numberId, classroom, school, type
    });

    

    if (response.ok) {
      const data = await response.json();
      return data.token; // todo: define this data (necessary data to load the next page)
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    throw new Error('Something went wrong. Please try again.');
  }
}

export async function getExamData(token) {
  const url = `${BASE_URL}/exam`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      if (response.status === 401) {
        // Token expired, redirect to login page
        window.location.href = '/';
      } else {
        console.log(errorData);
        throw new Error('Authentication failed');
      }
    } 
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong. Please try again.');
  }
}

export async function getTeacherQuestionsData(token) {
  const url = `${BASE_URL}/questions`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      const errorData = await response.json();
      if (response.status === 401) {
        // Token expired, redirect to login page
        window.location.href = '/teacher';
      } else {
        console.log(errorData);
        throw new Error('Authentication failed');
      }
    } 
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong. Please try again.');
  }
}

export async function postTeacherQuestionsData(token, questions) {
  const url = `${BASE_URL}/questions`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(questions)
    });

    if (response.ok) {
      const data = await response.json();
      return data// todo: define this data (necessary data to show if it was successful)
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    throw new Error('Something went wrong. Please try again.');
  }
}

export async function postExam(token, examOptions) {
  const url = `${BASE_URL}/exam`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(examOptions)
    });

    if (response.ok) {
      const data = await response.json();
      return data// todo: define this data (necessary data to show if it was successful)
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    throw new Error('Something went wrong. Please try again.');
  }
}



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