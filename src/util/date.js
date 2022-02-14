export const currentDate =()=>{
    const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
       return `${year}-${month>9?month:'0'+month}-${day}`;
}