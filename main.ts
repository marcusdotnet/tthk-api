import timetableService from "./service";



timetableService.fetchTimetable()
.then(() => {
    const data = timetableService.data;


    const tarpe22 = timetableService.getClassByName("TARpe22");
    console.log(tarpe22?.teachers);
    
    
    // console.log(timetableService.data.periods);
    // timetableService.getPrettyTimetable()
});