export const storeData=(key,value)=>{
  const data=JSON.stringify(value)
  localStorage.setItem(key,data)
}

export const getData=(key)=>{
  const data=localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export const removeData=(key)=>{
  localStorage.removeItem(key)
}