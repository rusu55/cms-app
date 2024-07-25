export const formatServices = (data: any) =>{
    console.log(data)
    let formatedData: string[] = []
    const photographers =  data.includes('mainPhoto', 'secondPhoto') ? '2 Photographers' : '1 Photographer';
    const videographers = data.includes('mainVideo', 'secondVideo') ? '2 Videographers' : '1 Videographer';
    const engagement = data.includes('engagement') && 'Engagement';
    const photobooth = data.includes('photobooth') && 'PhotoBooth';
     formatedData.push(photographers, videographers, engagement, photobooth)
    return formatedData
}