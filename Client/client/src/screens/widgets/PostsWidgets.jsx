import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import { InputBase, Button } from '@mui/material';
import { Image } from 'lucide-react';

const PostsWidgets = () => {
    const dispatch = useDispatch();
    const [post, setPost] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const render = useSelector((state) => state.auth.render);


    const _id = user ? user._id : null;

    const handlePosts = async () => {
        if (!_id) {
          console.error("User ID is missing");
          return;
        }
      
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
          formData.append("picture", image); // Ensure 'picture' matches the backend
        }
      
        try {
          const response = await fetch(`${render}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "multipart/form-data",
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const posts = await response.json();
          dispatch(setPosts({ posts }));
          setImage(null);
          setImagePreview(null); // Reset image preview
          setPost('');
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };
    const mode = useSelector((state) => state.auth.mode);
      
    const color = mode === 'blanc' ? 'bg-slate-400' : 'bg-slate-700';

    
    const color2 = mode === 'blanc' ? 'text-slate-700' : 'text-slate-200';

    return (
        <div className={`min-[800px]:w-[100%] max-lg:w-[100%]  flex items-center ${color} rounded-lg p-4 h-20 m-auto`}>
            <InputBase
                className={`border border-gray-800 rounded-md ${color2}`}
                placeholder='Add a post'
                onChange={(e) => setPost(e.target.value)}
                value={post}
                fullWidth
                multiline
            />
            <Dropzone
                name='picturePath'
                onDrop={(acceptedFiles) => {
                    const file = acceptedFiles[0];
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file)); // Create image preview
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover" />
                        ) : (
                            <Image className='font-bold hover:cursor-pointer m-2 size-8' />
                        )}
                        
                    </div>
                )}
            </Dropzone>
            <Button
                variant="contained"
                color="primary"
                onClick={handlePosts}
                disabled={!post.trim() || !_id}
            >
                Post
            </Button>
        </div>
    );
};

export default PostsWidgets;