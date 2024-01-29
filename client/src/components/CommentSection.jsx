import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button, TextInput, Textarea } from 'flowbite-react'
import { useState } from 'react'

function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(comment.length > 200){
            return
        }
        try{
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({
                    postId, content: comment, userId: currentUser._id
                })
            })
            const data = res.json()
            if(res.ok){
                setComment('')
                setCommentError(null)
            }
        }catch(err){
            setCommentError(err.message)
        }
    }

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? (
            <div className="flex items-center gap-1my-5 text-gray-500 
            text-sm">
                <p>Signed in as: </p>
                <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt={currentUser.username} />
                <Link to={`/dashboard?tab=profile`} className='text-xs text-cyan-600 hover:underline'>
                    @ {currentUser.username}
                </Link>
            </div>
        ): (
            <div className="text-sm text-teal-500 my-5 flex gap-1">
                You must sign in to comment.
                <Link className='text-blue-500 hover:underline' to={`/sign-in`}>Sign In</Link>
            </div>
        )}
        {
            currentUser && (
                <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                    <Textarea 
                        placeholder='Add a comment...'
                        rows={3}
                        maxLength={200}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className="flex justify-between items-center mt-5">
                        <p className='text-gray-500 text-sm'>{200 - comment.length} characters remaining</p>
                        <Button className='outline' gradientDuoTone='purpleToBlues' type='submit'>
                            Submit
                        </Button>
                    </div>
                    {
                        commentError && (
                            <Alert color='failure' className='mt-5'>{commentError}</Alert>
                        )
                    }
                </form>
            )
        }
    </div>
  )
}

export default CommentSection