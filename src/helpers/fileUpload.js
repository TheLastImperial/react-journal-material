export const fileUpload = async ( file )=>{
    const url = 'https://api.cloudinary.com/v1_1/dwar8vvjx/upload';
    const formData = new FormData();
    formData.append( 'upload_preset', 'react-journal' );
    formData.append( 'file', file );

    try{
        const resp = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if(!resp.ok) throw new Error('Hubo un error en la respuesta.')

        const cloudResp = await resp.json()
        return cloudResp.secure_url;

    }catch(e){
        throw new Error(e.message);
    };
}