export const sendResponse = (res, success=true, code=200, message="", data=[], error=false) =>{
  return res.json({
    success,
    code,
    message,
    data,
    error
  })
} 