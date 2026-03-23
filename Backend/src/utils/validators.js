export const isEmail =(email)=>{
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const isStrongPassword =(password)=>{
  return password.length >= 6;
}