import PN from "persian-number";

const convertTime = (date) => {

    const time = date.split("T")[1].split("+")[0].split(":");
    const persianTime = [PN.convertEnToPe(time[0]), PN.convertEnToPe(time[1]), PN.convertEnToPe(time[2])];
    return persianTime.join(":")
}

export { convertTime }