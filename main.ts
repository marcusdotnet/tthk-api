import timetableChangesService from "./timetableChangesService";
import timetableService from "./timetableService";


timetableChangesService.fetchChanges()
.then(() => {
        
});

// timetableService.fetchTimetable()
// .then(() => {
//     const data = timetableService.data;

    
//     const tarpe22 = timetableService.getClassByName("TARpe22");
//     tarpe22?.timetable.query({
//         day: 4,
//     }).map(card => {
//         const lesson = card.lesson;

//         console.log(card.assignedDays[0].short, card.periodSpan);
//     });
    
    
    
    
//     // console.log(timetableService.data.periods);
//     // timetableService.getPrettyTimetable()
// });