export const isEmail =(email)=>{
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const isStrongPassword =(password)=>{
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
}