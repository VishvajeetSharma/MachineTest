export const isEmail =(email)=>{
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const isStrongPassword =(password)=>{
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/.test(password);
}