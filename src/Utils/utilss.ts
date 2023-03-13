export const Kelvin2celsius = ( k:number):string =>{
    return (k - 273.15).toFixed(2)  
}

type NumericRange<
    START extends number,
    END extends number,
    ARR extends unknown[] = [],
    ACC extends number = never
> = ARR['length'] extends END
    ? ACC | START | END
    : NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>

export const getDay = (dayIndex: number):string =>{
    const Day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
    return Day[dayIndex]
}

// export const getGeoLocation = async (): Promise<{ lat: number; lon: number; }> =>{
export const getGeoLocation = async (): Promise<void> =>{

    // const { geolocation } = navigator.canShare 
    navigator.geolocation.getCurrentPosition( ({ coords }) => {
        console.log('KKK',coords);
        
        // return  Promise.resolve({lat: coords.latitude, log: coords.longitude})
    })

    if(navigator.geolocation){
        console.log('aaa');
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            console.log('GGG');
            
            // return  Promise.resolve({lat: coords.latitude, log: coords.longitude})
        })
        
    }else{
        console.log('bbb');
        
    }
    console.log('cccc');
    
}