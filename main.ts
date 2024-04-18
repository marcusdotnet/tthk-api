import timetableService from "./service";



timetableService.fetchTimetable()
.then(() => {
    const data = timetableService.data;


    // const tarpe22 = timetableService.getClassByName("TARpe22");
    // console.log(tarpe22?.classroom);
    
    
    
    for (const card of Object.values(timetableService.data.cards)
        .filter(card => card.lesson.classes.find(cl => cl.name == "TARpe22"))
        .filter(card => card.assignedDays[0].id == "0")
    ) {
        const lesson = card.lesson;
        

        console.log(`
            Subject: ${lesson.subject.name}
            Day: ${card.assignedDays[0].name}
            Periods: ${card.periodSpan}
        `);            
    }
    
    
    
    // console.log(timetableService.data.periods);
    // timetableService.getPrettyTimetable()
});