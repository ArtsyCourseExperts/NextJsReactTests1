
/*
https://www.smashingmagazine.com/2021/09/useswr-react-hook-library-incremental-static-regeneration-nextjs/

Sample helpers file.

*/

export async function getTaxiData(){
    let data = await fetch("https://api.data.gov.sg/v1/transport/taxi-availability").then(r => r.json())
    return {taxis: data.features.properties[0].taxi_count, updatedAt: data.features.properties[0].timestamp}
}