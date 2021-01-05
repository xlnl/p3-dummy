import React, { useState } from 'react';
import { Button } from "reactstrap";

export default function Upload() {
    // actual file input state for handleFileInputChange
    const [fileInputState, setFileInputState] = useState('');
    // const [previewSource, setPreviewSource] = useState('');
    // const [selectedFile, setSelectedFile] = useState();

    // to grab the file out of the input state
    const handleFileInputChange = (e) => {
        //just grabbing one file
        const file = e.target.files[0]
    };

    // const previewFile = (file) => {

    // };

    // const handleSubmitFile = (e) => {

    // };

    return (
        <div>
            <h1 className="title">Make a post</h1>
            <form className="form-group">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <Button className="btn" type="submit">
                    Submit
                </Button>
            </form>
            {/* {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )} */}
        </div>
    );
}