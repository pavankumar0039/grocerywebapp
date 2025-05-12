const url=`https://api.cloudinary.com/v1_1/dor6tbvk2/auto/upload`
const uploadFiles=async(file)=>{
    const formData=new FormData()
    formData.append('file',file)
    formData.append('upload_preset',"chat-app-file")
    const res=await fetch(url,{
        method:'post',
        body:formData
    })
    const resdata=await res.json()
    return resdata
}
export default uploadFiles