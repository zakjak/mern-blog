import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import app from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom'

function CreatePost() {
    const [file, setFile] = useState(null)
    const [publishError, setPublishError] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({})

    const navigate = useNavigate()

    const handleUploadImage = async () => {
        try{
            if(!file){
                setImageUploadError('Please select an image')
                return
            }
            setImageUploadError(null)
            const storage = await getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setImageUploadProgress(progress.toFixed(0))
                },
                (error) => {
                    setImageUploadError('Image upload failed')
                    setImageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        setImageUploadProgress(null)
                        setImageUploadError(null)
                        setFormData({...formData, image: downloadUrl})
                    })
                }
            )
        }catch(err){
            setImageUploadError('Image upload failed')
            setImageUploadProgress(null)
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(!res.ok){
                setPublishError(data.message)
                return
            }
            if(res.ok){
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }

        }catch(err){
            setPublishError('Something went wrong')
        }
    }

  return (
    <div className='P-3 max-w-3xl mx-auto min-h-screen'>
        <h2 className='text-center text-3xl my-7 font-semibold'>Create a post</h2>
        <form className='flex  gap-4 flex-col justify-between' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='title' required id='title'
                    className='flex-1'
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <Select 
                    onChange={(e) => 
                        setFormData({...formData, category: e.target.value})
                    }
                >
                    <option value='uncategorized'>Select a category</option>
                    <option value="javascript">Javascript</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput typeof='file' accept='image/*' onChange={e => setFile(e.target.files[0])} />
                <Button 
                    onClick={handleUploadImage} 
                    type='button' 
                    gradientDuoTone='purpleToBlue' 
                    size='sm' 
                    outline
                >
                    {imageUploadProgress ? (
                        <div className="w-16 h-16">
                            <CircularProgressbar 
                                value={imageUploadProgress} 
                                text={`${imageUploadProgress || 0}%`}
                            />
                        </div>
                    ) : (
                        'Upload Image'
                    )
                    }
                </Button>
            </div>
            {imageUploadError && (
                <Alert color='failure'>
                    {imageUploadError}
                </Alert>
            )}
            {
                formData.image && (
                    <img 
                        src={formData.image}
                        alt='upload'
                        className='w-full h-72, object-cover'
                    />
                )
            }
            <ReactQuill 
                required 
                theme='snow' 
                placeholder='write-something...' 
                className='h-72 mb-12' 
                onChange={(value) => setFormData({...formData, content: value})}
            />
            <Button type='submit' gradientDuoTone='purpleToPink'>
                Publish
            </Button>
            {
                publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
            }
        </form>
    </div>
  )
}

export default CreatePost