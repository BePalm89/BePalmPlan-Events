import { v2 as cloudinary } from 'cloudinary';

export const deleteFile = (imgUrl) => {
    
    const splittedImg = imgUrl.split("/");
    const folderName = splittedImg.at(-2);
    const fieldName = splittedImg.at(-1).split(".");

    const public_id = `${folderName}/${fieldName[0]}`;

    cloudinary.uploader.destroy(public_id, () => {
        console.log("File deleted successfully!");
    })
}