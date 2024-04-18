import timetableService from "./service";



timetableService.fetchTimetable()
.then(() => {
    const data = timetableService.data;

    
    const tarpe22 = timetableService.getClassByName("TARpe22");
    tarpe22?.timetable.query({
        day: 0,
        subjectQuery: "Mobiil"
    }).map(card => {
        console.log(card.assignedDays[0].short, card.lesson.subject);
    });
    
    
    
    
    // console.log(timetableService.data.periods);
    // timetableService.getPrettyTimetable()
});